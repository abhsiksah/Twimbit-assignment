//this model will be used for storing posts
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    default: "no pic",
  },
  //this is an array where the users that has liked the post will be pushed into this
  //each individual item will be an objectid from the user model ie the user that created this like
  //intially this will be empty
  likes: [{ type: ObjectId, ref: "Usermodel" }],

  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "Usermodel" },
    },
  ],

  //here we are creating the relation of this model with user model
  //we also need to store who posted this and for that we are using the ObjectId and the object id refers to user model basically
  //the user who created it, thus we are building a relation model here
  // so the posted by will be of type  object id
  postedBy: {
    type: ObjectId,
    ref: "Usermodel",
  },
});

mongoose.model("Post", postSchema);
