import jwt from 'jsonwebtoken';

class JwtUtil {
  static generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
}

export { JwtUtil };
