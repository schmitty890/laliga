var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new object
var FactSchema = new Schema({
  description: {
    type: String
  },
  category: {
    type: String
  },
  approved: {
    type: Boolean
  },
  upvote: {
    type: Number
  },
  downvote: {
    type: Number
  },
  contestFact: {
    type: Number
  },
  submittedBy: {
    type: String
  },
}, { timestamps: true });

// This creates our model from the above schema, using mongoose's model method
var Fact = mongoose.model("Fact", FactSchema);

// Export the model
module.exports = Fact;
