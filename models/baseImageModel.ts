import mongoose from "mongoose";

const baseImageSchema = new mongoose.Schema({
  base_image: {
    type: String,
    required: true,
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

const BaseImages =
  mongoose.models.base_images || mongoose.model("base_images", baseImageSchema);

export default BaseImages;
