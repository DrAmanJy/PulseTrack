import { Schema, Types, model } from 'mongoose';

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title too long'],
    },

    category: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'general',
      maxlength: [50, 'Category too long'],
    },

    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [1440, 'Duration cannot exceed 24 hours'],
    },

    date: {
      type: Date,
      required: [true, 'Date is required'],
    },

    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes too long'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  },
);

activitySchema.index({ userId: 1, date: -1 });

const Activity = model('Activity', activitySchema);
export default Activity;
