import Activity from '../activities/activities.model.js';

export const getCategoryStats = async (req, res) => {
  const categories = await Activity.aggregate([
    { $match: { userId: req.userId } },
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
        userId: req.userId,
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
        userId: req.userId,
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

export const getMonthlyTrend = async (req, res) => {
  const trends = await Activity.aggregate([
    { $match: { userId: req.userId } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
        totalDuration: { $sum: '$duration' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    { $project: { month: '$_id', totalDuration: 1, count: 1, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { trends } });
};

export const getAverageDurationByCategory = async (req, res) => {
  const averages = await Activity.aggregate([
    { $match: { userId: req.userId } },
    {
      $group: {
        _id: '$category',
        avgDuration: { $avg: '$duration' }
      }
    },
    { $sort: { avgDuration: -1 } },
    { $project: { category: '$_id', avgDuration: { $round: ['$avgDuration', 2] }, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { averages } });
};

export const getTotalActivitiesByDayOfWeek = async (req, res) => {
  const days = await Activity.aggregate([
    { $match: { userId: req.userId } },
    {
      $group: {
        _id: { $dayOfWeek: '$date' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    { $project: { dayOfWeek: '$_id', count: 1, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { days } });
};

export const getActivitiesCountByMonth = async (req, res) => {
  const counts = await Activity.aggregate([
    { $match: { userId: req.userId } },
    {
      $group: {
        _id: { $month: '$date' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    { $project: { month: '$_id', count: 1, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { counts } });
};

export const getTop5LongestActivities = async (req, res) => {
  const activities = await Activity.aggregate([
    { $match: { userId: req.userId } },
    { $sort: { duration: -1 } },
    { $limit: 5 },
    { $project: { title: 1, duration: 1, category: 1, date: 1, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { activities } });
};

export const getDailyAverageDuration = async (req, res) => {
  const result = await Activity.aggregate([
    { $match: { userId: req.userId } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        dailyTotal: { $sum: '$duration' }
      }
    },
    {
      $group: {
        _id: null,
        averageDailyDuration: { $avg: '$dailyTotal' }
      }
    },
    { $project: { averageDailyDuration: { $round: ['$averageDailyDuration', 2] }, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { result: result[0] || { averageDailyDuration: 0 } } });
};

export const getRecentLongActivities = async (req, res) => {
  const activities = await Activity.aggregate([
    { $match: { userId: req.userId, duration: { $gte: 60 } } },
    { $sort: { date: -1 } },
    { $limit: 10 },
    { $project: { title: 1, duration: 1, date: 1, _id: 0 } }
  ]);
  res.status(200).json({ status: 'success', data: { activities } });
};
