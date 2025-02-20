import mongoose from 'mongoose';
import Category from './Category.js';
import User from './User.js';

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
