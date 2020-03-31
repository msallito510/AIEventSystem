const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: [true, "the event name is required."]
  },
  price: {
    type: Number,
    default: 0.0
  },
  description: String,
  image: String, // event image url
  dateInit: {
    type: String,
    default: "undefined"
  },
  dateEnd: {
    type: String,
    default: "undefined"
  },
  timeInit: {
    type: String,
    default: "undefined"
  },
  timeEnd: {
    type: String,
    default: "undefined"
  },
  ratings: [
    {
      numberOfLikes: Number,
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  location: {
    type: String,
    default: "Barcelona, Spain"
  },
  Lat: {
    type: String
  },
  Long: {
    type: String
  },
  admin: {
    type: String
  },
  tags: [{ type: String }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],


  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

const Events = mongoose.model("events", eventSchema);

module.exports = Events;
