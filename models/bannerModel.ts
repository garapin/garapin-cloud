import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
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

const Banners =
  mongoose.models.banners || mongoose.model("banners", bannerSchema);

export default Banners;
