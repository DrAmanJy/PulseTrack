import { AppError } from '../../shared/errors/AppError.js';
import { uploadImgToCloudinary } from '../../shared/utils/cloudinary.js';
import User from '../auth/auth.model.js';

export const getMe = async (req, res) => {
  res.json({
    status: 'success',
    message: 'User successfully fetched',
    data: { user: req.user },
  });
};

export const updateMe = async (req, res) => {
  if (!req.body?.name && !req.file) {
    throw new AppError('Please provide a name or a profile picture to update.', 400);
  }
  const updateData = { ...req.body };

  if (req.file) {
    const profile = await uploadImgToCloudinary(req.file.path);

    if (profile) {
      updateData.profileImage = {
        url: profile.secure_url,
        publicId: profile.public_id,
      };
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.json({
    status: 'success',
    message: 'User successfully updated',
    data: { user: updatedUser },
  });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const existingUser = await User.findById(req.user.id).select('+password');

  if (!existingUser) throw new AppError('User not found', 404);

  const isPasswordValid = await existingUser.comparePassword(currentPassword);
  if (!isPasswordValid) throw new AppError('Invalid password', 401);

  existingUser.password = newPassword;
  await existingUser.save();

  res.json({
    status: 'success',
    message: 'Password successfully changed',
    data: { id: existingUser.id },
  });
};

export const updateEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  if (req.user.email !== currentEmail) {
    throw new AppError('The current email provided is incorrect', 400);
  }

  let updatedUser;

  try {
    updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { email: newEmail },
      { new: true, runValidators: true },
    );
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('This email is already registered to another account', 409);
    }
    throw error;
  }

  if (!updatedUser) throw new AppError('User not found', 404);

  res.json({
    status: 'success',
    message: 'Email successfully updated',
    data: { id: updatedUser.id, email: updatedUser.email },
  });
};

export const deleteMe = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  if (!deletedUser) throw new AppError('User not found', 404);

  res.json({
    status: 'success',
    message: 'User successfully deleted',
    data: { id: deletedUser.id },
  });
};
