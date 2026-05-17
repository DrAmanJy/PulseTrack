import { Router } from 'express';
import { requireAuth } from '../../shared/middleware/auth.middleware.js';
import * as analyticsController from './analytics.controller.js';

const router = Router();

router.get('/categories', requireAuth, analyticsController.getCategoryStats);
router.get('/trends', requireAuth, analyticsController.getWeeklyTrend);
router.get('/summary', requireAuth, analyticsController.getDashboardSummary);

router.get('/monthly-trend', requireAuth, analyticsController.getMonthlyTrend);
router.get('/category-averages', requireAuth, analyticsController.getAverageDurationByCategory);
router.get('/day-of-week', requireAuth, analyticsController.getTotalActivitiesByDayOfWeek);
router.get('/monthly-counts', requireAuth, analyticsController.getActivitiesCountByMonth);
router.get('/longest-activities', requireAuth, analyticsController.getTop5LongestActivities);
router.get('/daily-average', requireAuth, analyticsController.getDailyAverageDuration);
router.get('/recent-long', requireAuth, analyticsController.getRecentLongActivities);

export default router;
