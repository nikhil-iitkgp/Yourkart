const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function userSignInController (req,res){
    try{
        const {email, password} = req.body;

        if(!email){
            throw new Error( "Email is required" )
        }
        if(!password){
            throw new Error("Password is required")
        }

        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
    
        const checkPassword = await bcrypt.compare(password,user.password)
       
        if(checkPassword){
            const tokenData = {
                _id: user._id,
                 email: user.email
            }
            const token = await jwt.sign( tokenData, process.env.TOKEN_SECRET_KEY,{ expiresIn: 60 * 60*24 });
            const tokenOpion={
                httpOnly : true,
                secure : true
            }
            res.cookie("token",token,tokenOpion).json({
                message: "Login Successfully",
                data: token,
                success: true,
                error: false
            })
        }else{
            throw new Error("Incorrect Password")
        }
    }catch (err) {
        console.log("err", err.message);
        res.status(400).json({
            message: err.message || err, 
            error: true,
            success: false
        });
    }
    
   
}

module.exports =userSignInController