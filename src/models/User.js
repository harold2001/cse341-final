import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    oauthId: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ['github', 'google'],
      default: 'github',
    },
    displayName: {
      type: String,
    },
    currencyPreference: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'PEN'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
