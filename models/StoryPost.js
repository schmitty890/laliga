var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new StoryPostSchema object
var StoryPostSchema = new Schema({
  title: {
    type: String
  },
  comment: {
    type: String
  },
  image: {
    type: String
  },
  user: {
    type: String
  },
  logo: {
    type: String
  }
}, { timestamps: true });

// This creates our model from the above schema, using mongoose's model method
var StoryPost = mongoose.model("StoryPost", StoryPostSchema);

// Export the Comment model
module.exports = StoryPost;
