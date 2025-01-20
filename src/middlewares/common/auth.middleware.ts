import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../api/auth/auth.service';

class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
      }

      const decoded = await AuthService.authenticate(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

export { AuthMiddleware };
