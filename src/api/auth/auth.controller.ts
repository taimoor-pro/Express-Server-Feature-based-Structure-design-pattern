import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validationResult } from 'express-validator';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      // Validate input data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Register user
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async authenticate(req: Request, res: Response) {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      const decoded = await AuthService.authenticate(token);
      return res.status(200).json({ message: 'Authentication successful', user: decoded });
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

export { AuthController };
