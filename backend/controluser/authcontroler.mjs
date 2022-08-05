import User from '../models/modeluser.mjs';
import bcrypt from 'bcrypt';
// import { validationResult } from 'express-validator';
// const error = validationResult(req);
//     return res.status(400).json({ errors: error.array() });
export const signup = async (req, res) => {
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
        message: 'user already exist',
      });
    }
    const user = new User({
      firstname,
      lastname,
      username: Math.random().toString(),
      email,
      password,
      role: 'user',
    });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(200).json({
        status: true,
        message: 'user register successfully',
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'user register failed',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
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
