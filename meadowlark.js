const express = require("express")
const expressHandlebars = require("express-handlebars")
const app = express()
const port = process.env.PORT || 3000

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main",
}))
app.set("view engine", "handlebars")

//custom homepage
app.get("/", (req, res) => {
    res.type("text/plain") //specifies what type of text
    res.send("Meadowlark Travel") //
})

//custom about page
app.get("/about", (req, res) => {
    res.type("text/plain")
    res.send("About Meadowlark Travel")
})

//needs to be below main pages, otherwise they won't work
//custom 404 page
app.use((req, res) => {
    res.type("text/plain")
    res.status(404)
    res.send("404 - Not Found")
})

//custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type("text/plain")
    res.status(500)
    res.send("500 - Server Error")
})

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))