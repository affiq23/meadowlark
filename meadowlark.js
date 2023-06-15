const fortune = require("./lib/fortune")

const express = require("express"); //calling the express function
const expressHandlebars = require("express-handlebars") //calling engine function from express-handlebars
const app = express(); //calling an instance of the function
const port = process.env.port || 3000; //setting up port to use

//console.log('port: ' + port); //indicating port is set up
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
//app.engine and expressHandlebars.engine are two different engines

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public")) //fixed the picture issue

app.get('/', (req, res) => {
    res.render('home');
});



app.get('/about', (req, res) => {
    res.render('about', {fortune : fortune.getFortune()});
});

//needs to be below main pages, otherwise they won't work
//custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render("404")
})

//custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render("500")
})

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))