const userModel = require("../../models/userModel");

async function allUsers(req, res) {
    try {
        const allUsers = await userModel.find();
        res.json({
            message: "All Users",
            error: false,
            success: true,
            data: allUsers
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(400).json({
            message: err.message || "Failed to retrieve users",
            error: true,
            success: false
        });
    }
}


module.exports = allUsers;


