const passport = require("passport")
const localStrategy = require("passport-local")
const {ObjectId} = require("mongodb")

module.exports = function (app, authDataBase) {

    //serialize and deserialize user object

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        authDataBase.findOne({_id: new ObjectId(id)}, (err, user) => {
            if (err) {
                done(err)
            } else {
                done(null, user)
            }
        })
    })

    // defining the passport local auth strategy

    passport.use(new localStrategy(
        (username, password, done) => {
            authDataBase.findOne({username: username}, (err, user) => {
                console.log(`user ${username} attempted to login`)
                
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                if (password !== user.password) {
                    return done(null, false)
                }
                done(null, true)
            })
        }
    ))

}