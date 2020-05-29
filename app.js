const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:2701/userDB", {useNewUrlParser: true});


app.get('/', function(req, res){
    res.render('home');
});
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/register', function(req, res){
    res.render('register');
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});

// Soocket addrese already in use::
// sudo lsof -iTCP -sTCP:LISTEN -n -P
// sudo kill <mongo_command_pid>