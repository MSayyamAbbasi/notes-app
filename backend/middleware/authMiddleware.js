/**
 * JWT authentication middleware — structure-ready for future implementation.
 * Uncomment and wire routes when auth is enabled.
 */
// import jwt from 'jsonwebtoken';
// import ApiError from '../utils/ApiError.js';

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     return next(new ApiError(401, 'Not authorized, no token'));
//   }
//   try {
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     next(new ApiError(401, 'Not authorized, token invalid'));
//   }
// };

export const protect = (_req, _res, next) => next();
