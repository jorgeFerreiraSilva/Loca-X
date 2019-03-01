const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, min: 6, required: true, unique: true },
  password: { type: String, min: 7, required: true },
  name: { type: String, min: 1, required: true },
  description: { type: String },
  pathPicture: { type: String },
  state: { type: String, required: true, enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'] }
});

const User = mongoose.model('User', userSchema);
module.exports = User;





