import jwt from 'jsonwebtoken';

export function requireAuth(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      console.warn('requireAuth: missing token');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      console.log('requireAuth: verifying token');
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log('requireAuth: token payload', payload);
      if (role && payload.role !== role) {
        console.warn(`requireAuth: role mismatch. required=${role} got=${payload.role}`);
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = payload;
      next();
    } catch (err) {
      console.error('requireAuth: token verification failed', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
