const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const environment = require('../../../config/environment');


module.exports.create = async function (req, res) {
	console.log("req.body from users_api", req.body);

    if(req.body.password != req.body.confirmPassword){
        return res.status(200).json({
            message: "Passwords do not match !",
            success :false
        });
    }

    try{
        let user = await User.findOne({email:req.body.email});

        if(!user){

            let user_same_user_name = await User.findOne({user_name : req.body.user_name});
            if(!user_same_user_name){

                let new_user = User.create(req.body);

                return res.status(200).json({
					success: true,
					message: "You have signed up, sign in to continue!",
					// data: {
					// 	token: jwt.sign(new_user.toJSON(), env.jwt_secret, { expiresIn: "1000000" }),
					// 	user: user,
					// },
				});




            }else{
                return res.status(200).json({
                    message: "Please try a different user name !",
                    success :false
                });
            }

        }else{
            return res.status(200).json({
				message: "You have already signed up, sign in to continue!",
                succes:false,
				data: {
					user: user,
				},
			});
        }
    }catch(err){
        return res.json(500 , {
            error_message : err,
            success:false,
            message:"Internal Server Error!"
        })
    }

};


module.exports.createSession = async function(req , res){

    try {
        let user = await User.findOne({email:req.body.email});
        console.log(req.body.password);
        if(!user || user.password != req.body.password){
        
            return res.json(422, {
                success:false ,
                message:"Invalid Username Or Password"           
            });

        }

        return res.json(200,{
            success:true,
            message :"Sign in sucessfull , here is your token . Keep it safe !",
            data :{
                token : jwt.sign(user.toJSON() , environment.jwt_secret ,  {expiresIn : '1000000'})//toJSON converts the user to json and codial is the secret encryption key usin which we decrypt and encrypt the jwt
            }
        })


    } catch (error) {
        return res.json(500 , {
            success:false,
            message:"Internal Server Error!"
        })
    }


}
