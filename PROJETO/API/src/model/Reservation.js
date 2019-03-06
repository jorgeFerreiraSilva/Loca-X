const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  hirerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pricePerDay: { type: Number, min: 1 },
  startDate: { type: Date },
  endDate: { type: Date },
  status: {
    type: String, required: true, default: 'Em espera', enum: ['Em espera', 'Alugando', 'Finalizado', 'Recusado'],
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
