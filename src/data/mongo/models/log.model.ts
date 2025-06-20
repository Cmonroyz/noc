import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['low','medium','high'],
    default: 'low',
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  origin: {
    type: String,
  },
});

export const LogModel = mongoose.model('log', logSchema);
