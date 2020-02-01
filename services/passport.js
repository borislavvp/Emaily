
const mongoose = require('mongoose');
const User = mongoose.model('users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
//this user is what we pull out 2 sec ago from the db
passport.serializeUser((user,done) => {
  done(null, user.id);
  //null because we expect no errors
  //this id is the automatic generated id from mongo
});

passport.deserializeUser((userID,done) => {
  User.findById(userID)
  .then( user => {
      done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ providerId: profile.id})
        
    if(existingUser){
        //we already have a record with that id
       return done(null,existingUser);
    }
    
    const newUser = await new User({ 
        providerId: profile.id,
        first_name:profile.name.givenName,
        last_name:profile.name.familyName
      }).save()
    
    done(null,newUser);
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ["email", "name"],
      proxy: true
    },
    async function(accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ providerId: profile.id})
      if(existingUser){
          //we already have a record with that id
        return done(null,existingUser);
      }
      const newUser = await new User({ 
          providerId: profile.id,
          first_name:profile.name.givenName,
          last_name:profile.name.familyName
        }).save()
      
      done(null,newUser);
    }
  )
);