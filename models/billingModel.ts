import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  invoice_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  app_id: {
    type: String,
    required: true,
  },
  install_app_name: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
  invoice_url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  payment_method: {
    type: String,
    required: false,
  },
  payment_channel: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Billings =
  mongoose.models.billings || mongoose.model("billings", billingSchema);

export default Billings;
