import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_name: {
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

const Categories =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Categories;
