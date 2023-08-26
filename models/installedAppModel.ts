import mongoose from "mongoose";

const installedAppSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  app_id: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: false,
  },
  install_app_name: {
    type: String,
    required: false,
  },
  next_billing_date: {
    type: Date,
    required: true,
  },
  app_status: {
    type: String, // Active, Overdue, Deleted, Uninstalled
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
  deleted_at: {
    type: Date,
    required: false,
  },
});

const InstalledApp =
  mongoose.models.installed_apps ||
  mongoose.model("installed_apps", installedAppSchema);

export default InstalledApp;
