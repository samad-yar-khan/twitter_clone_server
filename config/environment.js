


const production = {

    db : process.env.TWITTER_DB, //here we add the db name
    db_pass : process.env.TWITTER_DB_PASS,
    jwt_secret : process.env.TWITTER_JWT_SECRET,//using random key gen .com
    port : process.env.PORT || 8000
}  

module.exports = production;
