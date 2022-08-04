import jwt from 'jsonwebtoken';

const requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.SECRETKEY);
  req.user = user;
  console.log(user);
  next();
};
export default requireSignin;
