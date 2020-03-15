const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: [true, "the event name is required."]
  },
  description: String,
  dateInit: {
    type: Date,
    default: Date.now
  },
  dateEnd: {
    type: Date,
    default: Date.now + 1
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
  guests: [
    {
      type: String,
      status: {
        type: Boolean,
        default: [false, "the guest is not authorized."]
      },
      guest: {
        selfie: String //image url
      }
    }
  ]
});

const Events = mongoose.model("events", eventSchema);

module.exports = Events;
