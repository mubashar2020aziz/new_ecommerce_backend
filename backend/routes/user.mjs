import express from 'express';
const router = express.Router();
import { signup } from '../controluser/authcontroler.mjs';
import { signin } from '../controluser/authcontroler.mjs';
import requireSignin from '../controluser/authcontrol.mjs';
import { adminsignup } from '../controluser/adminauth.mjs';
import { adminsignin } from '../controluser/adminauth.mjs';

router.post('/adminsignup', adminsignup);

router.post('/adminsignin', adminsignin);

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/profile', requireSignin, (req, res) => {
  return res.status(200).json({ user: 'profile' });
});

export default router;
