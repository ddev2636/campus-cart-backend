import mongoose from "mongoose";

const ThingSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Books", "Utensils", "Cycles", "Others"],
    default: "Books",
  },
  contact: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Thing", ThingSchema);
