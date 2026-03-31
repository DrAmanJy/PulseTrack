import { Router } from 'express';
import { requireAuth } from '../../shared/middleware/auth.middleware.js';
import * as analyticsController from './analytics.controller.js';

const router = Router();

router.get('/categories', requireAuth, analyticsController.getCategoryStats);
router.get('/trends', requireAuth, analyticsController.getWeeklyTrend);
router.get('/summary', requireAuth, analyticsController.getDashboardSummary);

export default router;
