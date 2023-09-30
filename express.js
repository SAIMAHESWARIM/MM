const express = require('express');
const app = express();
const port = 3013;
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("../k.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

app.set('view engine', 'ejs');

app.get('/', function(req, res)  {
  res.send('Hello World!');
});
app.get("/signin", function (req, res) {
    res.render("signin");

  });
  app.get("/signinSubmit", function (req, res)  {
    
    const email = req.query.email;
     const password = req.query.password;

     db.collection('userDemo')
   .where("Email","==",req.query.Email)
   .where("Password","==",req.query.Password)
   .get()
   .then((docs)=>{
    if(docs.size>0){
        res.send("successfull");
    }
    else{
        res.send("Fail");
    }
   });
});



  app.get("/signupSubmit", function (req, res)  {
        const full_name = req.query.full_name;
        const last_name = req.query.last_name;
        const email = req.query.email;
         const password = req.query.password;


         db.collection('userDemo').add({
            name: full_name + last_name,
            email: email,
            password: password,
        }).then(()=>{
          res.send("signup sucessfull, please login ")
        });
    });
    
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});