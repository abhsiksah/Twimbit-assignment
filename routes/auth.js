const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwsecret } = require("../config/keys");
const requirelogin = require("../middleware/requiredlogin");

//for testing to see if requirelogin middleware works
// router.get("/protected", requirelogin, (req, res) => {
//   res.json({ greeting: "hello user" });
// });

//Signup, we are sending  post request we also have encypted passwords

router.post("/signup", (req, res) => {
  //   res.send(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.json({ error: "please enter all the fields" }).status(402);
  }
  User.findOne({ email: email })
    .then((saveduser) => {
      //the object that matches with email is passed in here as saveduser
      if (saveduser) {
        res.json({ error: "User already exists" }).status(400);
      }

      bcrypt.hash(password, 3).then((hashedpassword) => {
        const newuser = new User({
          email: email,
          name: name,
          password: hashedpassword,
        });

        newuser
          .save()
          .then(() => {
            res.json({ msg: "saved user" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((er) => {
      console.log(er);
    });
});

//Login we have a post request here where we will check for email and password enetered correctly

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .json({ msg: "please enter valid email or password" })
      .status(402);
  }

  User.findOne({ email: email }).then((saveduser) => {
    //the object that matches with the email  passed in the body it will be fetched here as saveduser
    if (!saveduser) {
      return res
        .json({ msg: "please enter valid email or password" })
        .status(402);
    }
    bcrypt
      .compare(password, saveduser.password)
      .then((match) => {
        if (match) {
          // res.send({ msg: "logged in" });

          const token = jwt.sign({ _id: saveduser._id }, jwsecret);
          const { _id, name, email } = saveduser;
          res.json({ token, user: { _id, name, email } });
        } else {
          return res.json({ msg: "please enter valid email or password" });
        }
      })
      .catch((er) => {
        console.log(er);
      });
  });
});

module.exports = router;
