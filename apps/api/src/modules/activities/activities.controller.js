import { AppError } from '../../shared/errors/AppError.js';
import Activity from './activities.model.js';

export const getActivities = async (req, res) => {
  const { id: userId } = req.user;

  // Parse and validate pagination parameters
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const requestedLimit = parseInt(req.query.limit, 10) || 20;
  const maxLimit = 100;
  const limit = Math.min(Math.max(1, requestedLimit), maxLimit);

  const skip = (page - 1) * limit;

  const activities = await Activity.find({ userId })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json({
    status: 'success',
    results: activities.length,
    page,
    limit,
    message: 'Activities fetched successfully',
    data: { activities },
  });
};

export const getActivity = async (req, res) => {
  const { id: activityId } = req.params;
  const { id: userId } = req.user;

  const activity = await Activity.findOne({ _id: activityId, userId }).lean();

  if (!activity) throw new AppError('Activity not found or unauthorized', 404);

  res.status(200).json({
    status: 'success',
    message: 'Activity fetched successfully',
    data: { activity },
  });
};

export const createActivity = async (req, res) => {
  const { id: userId } = req.user;

  const newActivity = await Activity.create({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Activity saved',
    data: { activity: newActivity },
  });
};

export const updateActivity = async (req, res) => {
  const { id: activityId } = req.params;
  const { id: userId } = req.user;

  const updatedActivity = await Activity.findOneAndUpdate(
    { _id: activityId, userId },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
      lean: true,
    },
  );

  if (!updatedActivity) throw new AppError('Activity not found or unauthorized', 404);

  res.status(200).json({
    status: 'success',
    message: 'Activity successfully updated',
    data: { activity: updatedActivity },
  });
};

export const deleteActivity = async (req, res) => {
  const { id: activityId } = req.params;
  const { id: userId } = req.user;

  const deletedActivity = await Activity.findOneAndDelete({
    _id: activityId,
    userId,
  });

  if (!deletedActivity) throw new AppError('Activity not found or unauthorized', 404);

  res.status(200).json({
    status: 'success',
    message: 'Activity successfully deleted',
    data: { id: deletedActivity._id },
  });
};