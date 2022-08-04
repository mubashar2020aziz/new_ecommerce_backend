import User from '../models/adminmodel.mjs';
import bcrypt from 'bcrypt';

export const adminsignup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone } = req.body;
    if (!firstname || !lastname || !email || !password || !phone) {
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
      phone,
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

    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      token = await userlogin.generateAuthToken();
      console.log(token);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: 'user login not exist',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'user login successfull',
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
