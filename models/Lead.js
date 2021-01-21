const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
  client_name: {
    type: String,
    required: true
  },
  client_phone: {
    type: String,
    required: true
  },
  client_email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lead = mongoose.model("leads",LeadSchema);
