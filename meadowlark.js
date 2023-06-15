const fortune = require("./lib/fortune")
const handlers = require("./lib/handlers")

const express = require("express"); //calling the express function
const expressHandlebars = require("express-handlebars") //calling engine function from express-handlebars
const app = express(); //calling an instance of the function
const port = process.env.port || 3000; //setting up port to use

//console.log('port: ' + port); //indicating port is set up
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
//app.engine and expressHandlebars.engine are two different engines

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public")) //fixed the picture issue

app.get("/", handlers.home)


app.get("/about", handlers.about)

//needs to be below main pages, otherwise they won't work
//custom 404 page
app.use(handlers.notFound)

//custom 500 page
app.use(handlers.serverError)

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))