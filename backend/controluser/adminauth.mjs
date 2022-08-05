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
      return res.status(402).json({
        status: false,
        message: 'plz fill the form',
      });
    }

    const user = await User.findOne({ email: email });
    if (user && user.role === 'admin') {
      const isMatch = await bcrypt.compare(password, user.password);
      token = await user.generateAuthToken();
      console.log(token);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: 'admin login not exist',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'admin login successfull',
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
