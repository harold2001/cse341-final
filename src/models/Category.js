import mongoose from 'mongoose';
import Type from '../models/Type.js';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Type,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
