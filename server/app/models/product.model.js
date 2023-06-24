const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  productName: { type: String, required: true },
  productOwnerName: { type: String, required: true },
  developers: { type: [String], required: true },
  scrumMasterName: { type: String, required: true },
  startDate: { type: Date, required: true },
  methodology: { type: String, enum: ["Agile", "Waterfall"], required: true },
});

module.exports = mongoose.model("Product", productSchema);
