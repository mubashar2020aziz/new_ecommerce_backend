import User from '../models/adminmodel.mjs';
import bcrypt from 'bcrypt';

export const adminsignup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(402).json({
        status: false,
        message: 'plz fill the form',
      });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(403).json({
        status: false,
        message: 'admin already exist',
      });
    }
    const user = new User({
      firstname,
      lastname,
      username: Math.random().toString(),
      email,
      password,

      role: 'admin',
    });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(200).json({
        status: true,
        message: 'admin register successfully',
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'admin register failed',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const adminsignin = async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: 'plz fill the form',
      });
    }

    const user = await User.findOne({ email });
    if (user && user.role === 'admin') {
      const isMatch = await bcrypt.compare(password, user.password);
      // token = await user.generateAuthToken(user._id);
      // console.log(token);
      // res.status('token', token, {
      //   expires: new Date(Date.now() + 258892000000),
      // });
      const { _id, firstName, lastName, email, role, fullName } = user;
      res.cookie('token', token, { expireIn: '30d' });
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: 'admin login fail',
        });
      } else {
        return res.status(200).json({
          token: user.generateAuthToken(),
          user: { _id, firstName, lastName, email, role, fullName },
          // _id: user._id,

          // email: user.email,
          // role: user.admin,
          // token: user.generateAuthToken(user._id),
          // message: 'admin login successfully',
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: 'invalid credientials',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const adminsignout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'signout successfully' });
};
