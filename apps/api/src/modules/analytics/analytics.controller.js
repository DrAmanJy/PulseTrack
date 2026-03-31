import Activity from '../activities/activities.model.js';

export const getCategoryStats = async (req, res) => {
  const categories = await Activity.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$duration' },
        activityCount: { $sum: 1 },
      },
    },
    { $project: { category: '$_id', total: 1, activityCount: 1, _id: 0 } },
    { $sort: { total: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    message: 'Categories successfully fetched',
    data: { categories },
  });
};

export const getWeeklyTrend = async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const trends = await Activity.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        dailyTotal: { $sum: '$duration' },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: '$_id', dailyTotal: 1, _id: 0 } },
  ]);

  res.json({
    status: 'success',
    message: 'Trends successfully fetched',
    data: { trends },
  });
};

export const getDashboardSummary = async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const [summary] = await Activity.aggregate([
    {
      $match: {
        userId: req.user._id,
        date: { $gte: sevenDaysAgo },
      },
    },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalDuration: { $sum: '$duration' },
              totalActivities: { $sum: 1 },
            },
          },
        ],
        topCategory: [
          {
            $group: {
              _id: '$category',
              total: { $sum: '$duration' },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 1 },
        ],
      },
    },
    {
      $project: {
        totalDuration: { $ifNull: [{ $arrayElemAt: ['$summary.totalDuration', 0] }, 0] },
        totalActivities: { $ifNull: [{ $arrayElemAt: ['$summary.totalActivities', 0] }, 0] },
        topCategory: { $ifNull: [{ $arrayElemAt: ['$topCategory._id', 0] }, null] },
        topCategoryDuration: { $ifNull: [{ $arrayElemAt: ['$topCategory.total', 0] }, 0] },
      },
    },
  ]);

  res.json({
    status: 'success',
    message: 'Summary successfully fetched',
    data: {
      summary,
    },
  });
};
