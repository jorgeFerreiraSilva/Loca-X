const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, min: 1, max: 280 },
}, {
  timestamps: {
    createdAt: 'created_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;





