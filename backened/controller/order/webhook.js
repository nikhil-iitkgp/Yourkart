const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const addToCartModel = require('../../models/cartProduct');

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

// Helper function to retrieve line items
async function getLineItems(lineItems) {
    let productItems = [];

    if (lineItems?.length) {  // Adjusted check for lineItems length
        for (const item of lineItems) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,  // Converting price to main unit (INR)
                quantity: item.quantity,
                image: product.images,
            };
            productItems.push(productData);
        }
    }

    return productItems;
}

// Webhooks handler
const webhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    const payloadString = JSON.stringify(request.body);

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        try {
            const session = event.data.object;

            // Retrieve line items from the session
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const productDetails = await getLineItems(lineItems.data);  // Adjusted for structure

            // Build the order details
            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent || 'N/A',  // Handle null payment_intent
                    payment_method_type: session.payment_method_types[0],
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options.map((s) => ({
                    ...s,
                    shipping_amount: s.shipping_amount / 100,  // Ensure shipping amount is in correct format
                })),
                totalAmount: session.amount_total / 100,  // Convert total amount to main unit (INR)
            };

            // Save the order in MongoDB
            const order = new orderModel(orderDetails);
            const savedOrder = await order.save();

            // If order is saved successfully, delete cart items
            if (savedOrder?._id) {
                await addToCartModel.deleteMany({ userId: session.metadata.userId });
                console.log('Order saved and cart items deleted.');
            } else {
                console.error('Failed to save the order.');
            }
        } catch (error) {
            console.error('Error processing checkout session:', error.message);
            return response.status(500).send('Internal Server Error');
        }
    } else {
        console.log(`Unhandled event type: ${event.type}`);
    }

    response.status(200).send();
};

module.exports = webhooks;
