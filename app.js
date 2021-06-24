const express = require("express");
const app = express();

const mongoose = require("mongoose");
const { Mongouri } = require("./config/keys");

const PORT = 5000 || process.env.PORT;

//db connection

mongoose.connect(Mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

//models registration on app

//here is one imp thing you have to register your schema before the routes or else you will get the error schema not register
//what happens is js read this code line by line and it goes to routes and see that there is no schema so it gives error so you have to register schema first and then do the routes
require("./model/user");
//registration of post model this will handle all the post that we send from our frontend
require("./model/post");

//middleware
app.use(express.json());

// app.use(cors());
// this is used when we want to send a request from 1 domain to other but the port is different
//for eg react app on local 3000 and node on 5000

//routes
app.use(require("./routes/user"));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//server listen
app.listen(PORT, () => {
  console.log("server is up");
});
