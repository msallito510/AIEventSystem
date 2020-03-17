const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: [true, 'the event name is required.']
  },
  price: {
    type: Number,
    default: 0.00
  },
  description: String,
  image: String, // event image url
  dateInit: {
    type: String,
    default: "undefined"
  },
  dateEnd: {
    type: String,
    default: "undefined",
  },
  timeInit: {
    type: String,
    default: "undefined"
  },
  timeEnd: {
    type: String,
    default: "undefined",
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
    default: 'Barcelona, Spain'
  },
  provincia: {
    type: String,
    default: 'Barcelona'
  },
  municipio: {
    type: String,
    default: 'Barcelona'
  },
  admin: {
    type: String
  },
  guests: [
    {
      type: String,
      status: {
        type: Boolean,
        default: [false, 'the guest is not authorized.']
      },
      guest: {
        selfie: String // image url
      }
    }
  ]
});

const Events = mongoose.model('events', eventSchema);

module.exports = Events;
