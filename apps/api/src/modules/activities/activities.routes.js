import { Router } from 'express';
import { activitySchema, updateActivitySchema } from '@pulsetrack/validations';
import { validate, validateId } from '../../shared/middleware/validate.middleware.js';
import { requireAuth } from '../../shared/middleware/auth.middleware.js';
import * as activityController from './activities.controller.js';

const router = Router();

router
  .route('/')
  .post(requireAuth, validate(activitySchema), activityController.createActivity)
  .get(requireAuth, activityController.getActivities);

router
  .route('/:id')
  .get(requireAuth, validateId, activityController.getActivity)
  .patch(requireAuth, validateId, validate(updateActivitySchema), activityController.updateActivity)
  .delete(requireAuth, validateId, activityController.deleteActivity);

export default router;