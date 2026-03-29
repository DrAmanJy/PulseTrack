import { Router } from 'express';
import { activitySchema, updateActivitySchema } from '@pulsetrack/validations';
import { validate, validateId } from '../../shared/middleware/validate.middleware.js';
import * as activityController from './activities.controller.js';

const router = Router();

router
  .route('/')
  .post(validate(activitySchema), activityController.createActivity)
  .get(activityController.getActivities);

router
  .route('/:id')
  .get(validateId, activityController.getActivity)
  .patch(validateId, validate(updateActivitySchema), activityController.updateActivity)
  .delete(validateId, activityController.deleteActivity);

export default router;
