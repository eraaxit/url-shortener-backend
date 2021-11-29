import mongoose from "mongoose";
const { Schema } = mongoose;

const URLSchema = new Schema({
  longURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    unique: true,
    required: true,
  },
});
const URL = mongoose.model("URL", URLSchema);
export default URL;
