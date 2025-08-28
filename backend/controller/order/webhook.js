const stripe = require("../../config/stripe");
const orderModel = require("../../models/OrderProductModel");
const addToCartModel = require("../../models/cartProduct");

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  let productItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      try {
        const product = await stripe.products.retrieve(item.price.product);
        const productData = {
          productId: product.metadata.productId,
          name: product.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
          image: product.images,
        };
        productItems.push(productData);
      } catch (error) {
        console.error("Error retrieving product:", error.message);
      }
    }
  }
  return productItems;
}

const webhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    // Construct the event using the raw request body
    event = stripe.webhooks.constructEvent(
      request.rawBody || request.body, // Ensure raw body is used to avoid payload tampering
      sig,
      endpointSecret
    );
    console.log("Stripe webhook event constructed successfully.");
  } catch (err) {
    console.error("Webhook Error:", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Checkout session completed:", session);

      // Ensure metadata and customer email exist
      if (!session.metadata?.userId || !session.customer_email) {
        console.error("Session metadata or customer email is missing.");
        response
          .status(400)
          .send("Invalid session metadata or customer email.");
        return;
      }

      let lineItems, productDetails;
      try {
        // Fetch line items
        lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        console.log("Line items fetched:", lineItems);

        // Process product details
        productDetails = await getLineItems(lineItems);
        console.log("Product details:", productDetails);
      } catch (error) {
        console.error(
          "Error fetching line items or product details:",
          error.message
        );
        response.status(500).send("Error processing line items or products.");
        return;
      }

      // Prepare order details
      const orderDetails = {
        productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types?.[0], // Use first payment method
          payment_status: session.payment_status,
        },
        shipping_options:
          session.shipping_options?.map((s) => ({
            id: s.id,
            description: s.description,
            shipping_amount: s.shipping_amount / 100,
          })) || [],
        totalAmount: session.amount_total / 100,
        createdAt: new Date(),
      };

      // Save the order to MongoDB
      try {
        const order = new orderModel(orderDetails);
        const saveOrder = await order.save();
        console.log("Order saved successfully:", saveOrder);

        // Delete cart items if the order is saved
        if (saveOrder?._id) {
          const deleteCartItem = await addToCartModel.deleteMany({
            userId: session.metadata.userId,
          });
          console.log("Cart items deleted:", deleteCartItem);
        }
      } catch (error) {
        console.error("Error saving order to MongoDB:", error.message);
        response.status(500).send("Error saving order.");
        return;
      }
      break;
    }

    // Handle other event types
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  response.status(200).send();
};

module.exports = webhooks;
