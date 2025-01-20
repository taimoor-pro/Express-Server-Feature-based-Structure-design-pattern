import express from 'express';
import { AuthController } from './auth.controller';
import { check } from 'express-validator';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Registration route
router.post('/register', [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], AuthController.register);

// Login route
router.post('/login', [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').notEmpty().withMessage('Password is required')
], AuthController.login);

// Authentication middleware example
router.get('/authenticate', AuthMiddleware.authenticate, AuthController.authenticate);

export { router };
