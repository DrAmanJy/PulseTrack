import { Router } from 'express';
import { requireAuth } from '../../shared/middleware/auth.middleware.js';
import { validate } from '../../shared/middleware/validate.middleware.js';
import { updateEmailSchema, updatePasswordSchema, updateUserSchema } from '@pulsetrack/validations';
import * as userController from './user.controller.js';

const router = Router();

const notImplemented = (req, res) => {
  return res.status(501).json({ message: `${req.path} is not implemented yet` });
};

router
  .route('/me')
  .get(requireAuth, userController.getMe)
  .patch(requireAuth, validate(updateUserSchema), notImplemented)
  .delete(requireAuth, userController.deleteMe);

router.patch(
  '/update-password',
  requireAuth,
  validate(updatePasswordSchema),
  userController.updatePassword,
);

router.patch('/update-email', requireAuth, validate(updateEmailSchema), userController.updateEmail);

export default router;
