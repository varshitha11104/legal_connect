// models/LawyerProfile.js
const mongoose = require('mongoose');

const LawyerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  specialization: { type: String, required: false },
  numberOfCasesDealtWith: { type: Number, required: false },
  numberOfCasesWon: { type: Number, required: false },
  numberOfCasesLost: { type: Number, required: false },
  fee: { type: Number, required: false },
  shortDescription: { type: String, required: false },
  profileImage: { type: String },
});

module.exports = mongoose.model('LawyerProfile', LawyerProfileSchema);
