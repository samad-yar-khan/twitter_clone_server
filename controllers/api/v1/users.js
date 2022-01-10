const User = require('../../../models/user');
const Tweets = require('../../../models/tweets');
const Follow = require('../../../models/follow');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const environment = require('../../../config/environment');


module.exports.create = async function (req, res) {
	// console.log("req.body from users_api", req.body);

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

                let new_user = await User.create(req.body);

                return res.status(200).json({
					success: true,
					message: "You have signed up, sign in to continue!",
					data: {
						// token: jwt.sign(new_user.toJSON(), env.jwt_secret, { expiresIn: "1000000" }),
						user: new_user,
					},
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


        if(!user || !user.isValidPassword(req.body.password)){
        
            return res.json(422, {
                success:false ,
                message:"Invalid Username Or Password"           
            });

        }

        delete user.password;

        return res.json(200,{
            success:true,
            message :"Sign in sucessfull , here is your token . Keep it safe !",
            data :{
                token : jwt.sign(user.toJSON() , environment.jwt_secret ,  {expiresIn : '100000000'})//toJSON converts the user to json and codial is the secret encryption key usin which we decrypt and encrypt the jwt
            }
        })


    } catch (error) {
        return res.json(500 , {
            success:false,
            message:"Internal Server Error!"
        })
    }


}



module.exports.profile = async function (req, res) {

    // console.log(req.params.id);
	try {

		let user = await User.findById(req.params.id , {
            'password' :0,
            '__v':0 ,
            'createdAt':0,
            'updatedAt':0
        });
		let user_tweets = await Tweets.find({ user: req.params.id });
        
        let following = await Follow.find(
            {
                from_user : req.params.id 
            },
            {
                '_id':0,
                'from_user':0,
                '__v':0 ,
                'createdAt':0,
                'updatedAt':0
            })
            .populate({
                path :'to_user',
                select :{
                    'name_' : 1 ,
                    'email' : 1,
                    'id':1 , 
                    'user_name' :1
                }
            });
        // let followingList =  following.map(async (f) =>  {
        // // let fellowUser = await User.findById(f.to_user);
      
        // // return fellowUser;
        // // }
        // // );

        let followers = await Follow.find(
            {
                to_user : req.params.id
            },
            {
                '_id':0,
                'to_user':0,
                '__v':0 ,
                'createdAt':0 ,
                'updatedAt':0
            })
            .populate({
                path :'from_user',
                select :{
                    'name_' : 1 , 
                    'email' : 1,
                    'id':1 , 
                    'user_name' :1
                }
            });

        
           
		return res.status(200).json({
			message: "User profile fetched successfully!",
			data: {
				profile_user: user,
				user_tweets: user_tweets,
                followers,
                following
			},
			success: true,
		});
	} catch (err) {
		console.log("Error in fetching user profile******", err);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};



module.exports.follow = async function (req, res) {
	if (req.user.id === req.params.id) {
		return res.status(403).json({
            success:false,
			message: "You can't follow yourself!",
		});
	} else {
		try {

            let relationShip = await Follow.findOne({from_user : req.user.id , to_user :  req.params.id});

			// if user does not already follows toFollowUSer
			if (!relationShip) {
				
                let newFollowRelationShip = await Follow.create({from_user : req.user.id , to_user :  req.params.id});

				return res.status(200).json({
					message: "You started following this user!",
					success: true,
                    newFollowRelationShip
				});
			} else {
				return res.status(403).json({
                    success:false,
					message: "You already follow this user",
				});
			}
		} catch (error) {
			console.log("Error", error);
			return res.status(500).json({
                success:false,
				message: error,
			});
		}
	}
};

module.exports.unfollow = async function (req, res) {
	if (req.user.id === req.params.id) {
		return res.status(403).json({
            success:false,
			message: "You can't unfollow yourself!",
		});
	} else {
		try {
		
            let relationShip = await Follow.findOne({from_user : req.user.id , to_user :  req.params.id});
			if (relationShip) {
				
                relationShip.remove();
                relationShip.update();

				return res.status(200).json({
					message: "You have unfollowed this user!",
					success: true,
				});
			} else {
				return res.status(403).json({
                    success:false,
					message: "You do not follow this user",
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: error,
			});
		}
	}
};

module.exports.followerList = async function (req,res){
   
    
   
}