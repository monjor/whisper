require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
//mongodb://localhost:27017/shopping
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

//making it an object created directly from the mongoos Schema
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

console.log(process.env.API_KEY);

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });


//using the user schema to set up a new user model
//"USER" collection created using the user Schema
const User = new mongoose.model("User", userSchema)


app.get('/', function(req, res){
    res.render('home');
});
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/register', function(req, res){
    res.render('register');
});

// create user inside the route
app.post("/register", function(req, res){
    const newUser = new  User ({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err) {
            console.log(err);
        }else{
            res.render("secrets");
        }
    });

});

app.post("/login", function(req, res){
 const username = req.body.username;
 const password = req.body.password;

 User.findOne({email: username}, function(err, foundUser){
     if (err) {
         console.log(err);
     } else{
         if(foundUser){
             if (foundUser.password == password){
                 res.render("secrets");
             }
         }
     }
 });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

// Soocket addrese already in use::
// sudo lsof -iTCP -sTCP:LISTEN -n -P
// sudo kill <mongo_command_pid>

// monogo server
// path cd /usr/local/var/mongodb
// to run : mongod --dbpath /usr/local/var/mongodb

// shell
// -path cd /usr/local/bin
// to run: ./mongo 