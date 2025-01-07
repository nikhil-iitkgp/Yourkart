const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')



async function userSignUpController(req,res) {
       try {
            const { email, password, name} = req.body
            console.log("data" , req.body)

            const user = await userModel.findOne({email})
            if (user) {
                throw new Error("User Already Exists")
            }
           

            if(!email){
                throw new Error( "Email is required" )
            }
            if(!password){
                throw new Error("Password is required")
            }
            if(!name){
                throw new Error("Name is required")
            }

            const salt = bcrypt.genSaltSync(10);
            const  hashPassword = await bcrypt.hashSync(password, salt);

            if(!hashPassword){
                throw new Error("Something is wrong")
                
            }
            
            const payload = {
                ...req.body,
                role: "GENERAL" ,
                password: hashPassword
            }

            const userData = new userModel(payload)
            const saveUser= await userData.save()

            res.status(201).json({
                data : saveUser,
                success : true,
                error : false,
                message : "User created successfully"
            })
        }catch (err) {
                console.log("err", err.message);
                res.status(400).json({
                    message: err.message || err, 
                    error: true,
                    success: false
                });
            }
            
}

module.exports = userSignUpController