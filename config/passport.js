const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "657839729275-o3d2tbbkhv2d5vrpc08tia0c6btca2rl.apps.googleusercontent.com",
        clientSecret: "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",
//         callbackURL: '/auth/google/callback',
        callbackURL:"https://collab-mjro.onrender.com"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
        
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
