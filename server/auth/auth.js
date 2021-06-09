const passport = require("passport")
const localStrategy = require("passport-local")
const {ObjectId} = require("mongodb")

module.exports = function (app, authDataBase) {

    //serialize and deserialize user object

    passport.serializeUser((user, done) => {
        console.log("in serialize")
        console.log(user)
        done(null, user._id)
    })


    passport.deserializeUser((id, done) => {
        console.log("in deserialize")
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
                    console.log("position 1")
                    return done(err)
                }
                if (!user) {
                    console.log("position 2")
                    return done(null, false)
                }
                if (password !== user.password) {
                    console.log("position 3")
                    return done(null, false)
                }
                console.log("position 4")
                done(null, user)
            })
        }
    ))

}