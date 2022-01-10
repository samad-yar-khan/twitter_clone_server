const Tweets = require("../../../models/tweets");
const Follow = require("../../../models/follow")
const User = require("../../../models/user");






module.exports.create = async function (req, res) {
	try {
		// console.log("from post_api", req.body);
		// console.log("user id", req.user.id);

        let tweetContent = req.body.content;
        // console.log(tweetContent.length);
        if(tweetContent.length > 140){
            return res.status(200).json({
                message: "Tweet must not exceed 140 characters !",
                success: false,
            });
        }

		let tweet = await Tweets.create({
			content: req.body.content,
            user: req.user.id,
		});

		// post = await post.populate('user', '-password).execPopulate();
		tweet = await tweet.populate({
            path :'user',
            select :{
                'name_' : 1 , 
                'email' : 1,
                'id':1 , 
                'user_name' :1
            }
        });

		// console.log("Tweets", tweet);

		return res.status(200).json({
			data: {
				tweet: tweet,
			},
			message: "Tweets created!",
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
            success :false,
			message: "Internal server error",
		});
	}
};

module.exports.destroy = async function (req, res) {
	try {
		let tweet = await Tweets.findById(req.params.id);


		if (tweet!==null && tweet.user == req.user.id) {
			tweet.remove();

			return res.status(200).json({
				message: "Tweet deleted successfully",
				success: true,
			});
		} else {
			return res.status(401).json({
				message: "You are not authourized to delete this post!",
                success : false
			});
		}
	} catch (err) {
		// console.log("Error in deleting post******:", err);
		return res.status(500).json({
            success : false,
			message: "Internal server error",
		});
	}
};

module.exports.timeLineTweets = async function (req, res) {
	try {
  
        
        const followings = await Follow.find({ from_user: req.user.id });
        const followingIds = followings.map(f => f.to_user);
        const followingTweets = await Tweets.find(
            { user: { $in: followingIds } })
            .sort('-createdAt')
            .populate({
                path: 'user',
                    select :{
                        'name_' : 1 ,
                        'id':1 , 
                        'user_name' :1
                    } 
            });

		if (followingTweets!==null ) {

			return res.status(200).json({
				message: "Tweet fetched successfully",
				success: true,
                tweets : followingTweets
			});
		} else {
			return res.status(401).json({
				message: "No Tweets to fetch",
                success : false
			});
		}
	} catch (err) {
		console.log("Error in getting post******:", err);
		return res.status(500).json({
            success : false,
			message: "Internal server error",
		});
	}
};

module.exports.ownTweets = async function (req, res) {
	try {
		let myTweets = await Tweets.find({user : req.user.id}).sort('-createdAt');


		if (myTweets!==null) {

			return res.status(200).json({
				message: "Tweet fetched successfully",
				success: true,
                myTweets
			});
		} else {
			return res.status(401).json({
				message: "No Tweets !",
                success : true
			});
		}
	} catch (err) {
		// console.log("Error in deleting post******:", err);
		return res.status(500).json({
            success : false,
			message: "Internal server error",
		});
	}
};
