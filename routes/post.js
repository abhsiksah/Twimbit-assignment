const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requiredlogin");
const Post = mongoose.model("Post");

router.get("/allposts", requirelogin, (req, res) => {
  // we are using the collection post from DB and doing a find to gett all posts
  //we are doing populate bcoz without it we will see only the object id and not the email , name and other things so in the second
  //argument of populate we can type all the fields we want to see
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")

    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//for creating the post with the middleware requiredlogin to fill in the post with the details of user that posted it
router.post("/createpost", requirelogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  //we are doing this bcoz we dont want the pass to be shown wid the post
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//for a user to see his own post
//we require requirelogin middleware because the req.user will only be getting the user details if the user is logged in
//inside this middleware we have the token verification to check the user's token for its login
router.get("/mypost", requirelogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myspost) => {
      res.json({ myspost });
    })
    .catch((er) => {
      console.log(er);
    });
});

//likes route
// $push: { likes: req.user._id },  will push the user in the likes array
router.put("/like", requirelogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      //pushing in the likes array
      $push: { likes: req.user._id },
    },
    {
      //this is imp or else mongo will cosider it as old record
      new: true,
    }
  )
    //this populate is imp because when you are liking then you go to /like route and there you dont have name in the postedBy so your name ie. who commented will disappear because there is no name in /like route
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//unlike route
// $pull: { likes: req.user._id },  will remove the user from the likes array

router.put("/unlike", requirelogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
      //this will remove all the occurences imp**
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requirelogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
