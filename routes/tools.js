const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema({
   toolname: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   link: {
      type: String,
      required: true
   },
   category: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
   createdAt: {
      type: Date,
      default: Date.now
   },
   likes: {
      type: Array,
      default: 0
   }
});

module.exports = mongoose.model('Tool', toolSchema);


