import jwt from 'jsonwebtoken';

export const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRETKEY);
    req.user = user;
    console.log(user);
  } else {
    return res.status(400).json({ message: 'Authorization required' });
  }
  next();
};

export const userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'user access denied' });
  }
  next();
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'admin access denied' });
  }
  next();
};
