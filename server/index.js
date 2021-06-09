const express = require("express")
const cors = require("cors")
const myDB = require("./database/connection")
const apiRoutes = require("./routes/api")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true}))

app.get("/", (req, res) => {
    res.send("Hello !")
})

myDB (async (client) => {

    const myDataBase = await client.db("issuetracker").collection("mycollection")

    const authDataBase = await client.db("issuetracker").collection("auths")
    //console.log(authDataBase)

    apiRoutes(app, myDataBase)

    app.use((req, res, next) => {
        res.status(404)
        .type("text")
        .send("Page Not Found...")
    })

}).catch(e => {
    console.log("unable to connect to Data Base " + e)
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})