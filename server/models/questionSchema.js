import mongoose from "mongoose";

const { Schema } = mongoose;

const questionModel = new Schema({
  question: { type: Array, default: [] },
  answer: { type: Array, default: [] },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Questions", questionModel);
