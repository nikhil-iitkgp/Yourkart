const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try {
        const {userId,email,role,name} =req.body
        const sessionUser = req.userId

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        const user = await userModel.findById(sessionUser)

        console.log("user Role", user.role)
        
        const updateUser= await userModel.findByIdAndUpdate(userId,payload)

        res.json({
            data : updateUser,
            message : "User updated successfully",
            success : true,
            error : false
        })
    }catch (err) {
        res.status(400).json({
            messsage : err.messsage || err,
            error : true,
            success : false
        })
    }
}

module.exports= updateUser