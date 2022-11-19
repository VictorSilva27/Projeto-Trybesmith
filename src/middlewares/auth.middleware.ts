import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
        
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    console.log(decoded);
    req.body.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}