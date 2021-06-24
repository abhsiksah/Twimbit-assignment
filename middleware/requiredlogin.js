const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwsecret } = require("../config/keys");
const User = mongoose.model("Usermodel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization == bearer jwt-token => format there is a space between it for eg: bearer ndjnIonoianioKs2H*&G&*G&T&*GYGYU
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in for this" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwsecret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in for this" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      //when we verify that the user is proper then we are assigning the req.user = the object user from our db
      //we should put next here because the search of the user in db might take awhile so we need to wait till the search i sover then call next middleware or function
      req.user = userdata;
      next();
    });
  });
};
