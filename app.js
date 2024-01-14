const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
require('dotenv').config();

const app = express()
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

mongoose.connect(process.env.MONGO_URI);


const signUpSchema = new mongoose.Schema({
    name:String,
    mobileNum:Number,
    emailId:{ type: String, unique: true },
    password:String
});

const User = mongoose.model ("User",signUpSchema);


app.get("/",function(req,res){
    res.render("index", { isLoggedIn: true,userNotFound:false });
});

app.post("/",async function(req,res){
    var email = req.body.email;
    var loginPassword = req.body.password;
    try {
        // Step 1: Find the user by email
        const user = await User.findOne({ emailId: email });
    
        // Step 2: If the user is found, compare passwords
        if (user) {
          const isPasswordMatch = await bcrypt.compare(loginPassword, user.password);
    
          if (isPasswordMatch) {
            console.log('Login successful');

                // Redirect to the success page after a delay
            setTimeout(function () {
                // res.redirect("/"); // Replace with your actual success page URL
                // res.sendFile(__dirname + "/successLogin.html"); //other way to do the same
                res.render("successLogin");
              }, 2000); // Redirect after 3 seconds (adjust as needed)
          } else {
            console.log('Invalid password');
            res.render("index", { isLoggedIn: false,userNotFound:false });
          }
        } else {
          console.log('User not found');
          res.render("index",{isLoggedIn: false,userNotFound:true});
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    console.log(email,loginPassword);
});


app.get("/signupPage.html",function(req,res){
    res.sendFile(__dirname + "/signupPage.html");
});

app.post("/signupPage.html",async function(req,res){
    var fname = req.body.Fname;
    var signUpMNumber = req.body.SignupMnumber;
    var signupEmail = req.body.SignupEmail;
    var signupPswd = req.body.SignupPswd;

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(signupPswd, 10);

    const user = new User({
        name:fname,
        mobileNum:signUpMNumber,
        emailId:signupEmail,
        password:hashedPassword,
    });

    try {
        await user.save();
        console.log("Successfully inserted data into UserData Database!!");
      } catch (err) {
        console.error('Error saving user:', err);
      }
    
    console.log(fname,signUpMNumber,signupEmail,signupPswd);
    console.log(user.name);

    // Redirect to the login page after a delay
    setTimeout(function () {
        res.redirect("/"); // Replace with your actual login page URL
        // res.sendFile(__dirname + "/index.html"); //other way to do the same
    }, 3000); // Redirect after 3 seconds (adjust as needed)
});

app.listen(3000,function(){
    console.log("Server is up running!!");
});