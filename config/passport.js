const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTStategy = require('passport-jwt').Strategy; //to make the authizationa and set the token
const ExtractJWT = require('passport-jwt').ExtractJwt;
const environment = require('./environment');


  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

const opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : environment.jwt_secret
}

passport.use(new JWTStategy(opts , function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id , function(err , user){
        if(err){
            console.log("Error in finding user from jwt " , err);
            return;
        }

        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    })

}));

module.exports = passport;