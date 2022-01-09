// const fs = require('fs');//we need to write to the file sstem hence we need this
// const rfs = require('rotating-file-stream');
// const path = require('path');

// const logDirectory = path.join(__dirname , '../production_logs'); // this will basically define where our logs will be stored
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // of the log directory exsts we use it else we make the log directory ourselves

// const AccessLogStream = rfs.createStream( 'access.log' , {
//     interval : '1d',
//     path : logDirectory
// })

// const development = {
    
//     name : 'development' ,
//     session_cookie_key : 'blahblah',
//     db : 'codial_development', //here we add the db name
//     smtp :{

//         service : 'gmail' ,
//         host : 'smtp.gmail.com'  ,
//         port : 587 , //need for tls
//         secure : 'false' ,
//         auth : {
//             user : "samad.ic19@nsut.ac.in" ,
//             pass : "pass"
//             }
        
//         },
//     //vars for google oath
//     google_client_id : "582821821390-gm5gfjmvb0etffmnhp31tk4db3m7dcj0.apps.googleusercontent.com",
//     google_client_secret: "Va9YwBqXwevhpH3fuST1ZJyo",
//     google_callback_url : "http://localhost:8000/users/auth/google/callback",//same as set in google while regesterings
//     jwt_secret : "codial",
//     morgan : {
//         mode : "dev",
//         options : {stream : AccessLogStream}
//     }
// }


const production = {

    // name : process.env.TWITTER_ENVIRONMENT,
    // asset_path : process.env.CODIAL_ASSET_PATH,
    // session_cookie_key : process.env.CODIAL_SESSION_COOKIE_KEY, //using random key gen .com
    db : process.env.TWITTER_DB, //here we add the db name
    db_pass : process.env.TWITTER_DB_PASS,
    // smtp :{

    //     service : 'gmail' ,
    //     host : 'smtp.gmail.com'  ,
    //     port : 587 , //need for tls
    //     secure : 'false' ,
    //     auth : {
    //         user : process.env.CODIAL_GMAIL_USERNAME ,
    //         pass : process.env.CODIAL_GMAIL_PASSWORD
    //         }
        
    //     },
    //vars for google oath
    // google_client_id : process.env.CODIAL_GOOGLE_CLIENT_ID,
    // google_client_secret: process.env.CODIAL_GOOGLE_CLIENT_SECRET,
    // google_callback_url : process.env.CODIAL_GOOGLE_CALLBACK_URL,//same as set in google while regesterings
    jwt_secret : process.env.TWITTER_JWT_SECRET,//using random key gen .com
    // morgan : {
    //     mode : "combined",
    //     options : {stream : AccessLogStream}
    // }
}  


//we choose what needs to be exported 
module.exports = production;
// module.exports = development;