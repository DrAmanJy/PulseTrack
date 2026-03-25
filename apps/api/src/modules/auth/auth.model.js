import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === 'local';
      },
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [128, 'Password too long'],
      select: false,
    },
    profileImage: {
      url: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: {
        type: String,
        minlength: 4,
        maxlength: 6,
        select: false,
      },
      expiresAt: {
        type: Date,
      },
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    virtuals: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.otp;
      },
    },
  },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  try {
    this.password = await hash(this.password, 10);
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await compare(candidatePassword, this.password);
};

//todo : generateOTP
//todo : verifyOTP

const User = model('User', userSchema);
export default User;
