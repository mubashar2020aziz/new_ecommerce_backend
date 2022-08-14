import express from 'express';
const router = express.Router();
import { signup } from '../controluser/authcontroler.mjs';
import { signin } from '../controluser/authcontroler.mjs';
import {
  adminMiddleware,
  requireSignin,
  userMiddleware,
} from '../controluser/authcontrol.mjs';
import { adminsignout, adminsignup } from '../controluser/adminauth.mjs';
import { adminsignin } from '../controluser/adminauth.mjs';
import { category, getCategories } from './category.mjs';
import { product } from '../controluser/controlproduct.mjs';
import multer from 'multer';
import shortid from 'shortid';
import { addItemToCart } from '../controluser/cartController.mjs';
import cookieParser from 'cookie-parser';
//  import  check  from 'express-validator';

router.use(cookieParser());

// multer space
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({ storage });
// multer space

router.post('/adminsignup', adminsignup);

router.post('/adminsignin', adminsignin);
router.post('/adminsignout', adminsignout);

router.post('/signup', signup);

router.post('/signin', signin);
router.post(
  '/category/create',
  requireSignin,
  adminMiddleware,
  upload.array('categoryImage'),
  category
);
router.get('/category/getcategories', getCategories);
router.post(
  '/product/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  product
);

router.post(
  '/user/cart/addtocart',
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.post('/profile', requireSignin, (req, res) => {
  return res.status(200).json({ user: 'profile' });
});

export default router;
// [
//   check('firstname').notEmpty().withMessage('first name is required'),
//   check('lastname').notEmpty().withMessage('last name is required'),
//   check('email').isEmail().withMessage(' valid email  is required'),
//   check('password')
//     .isLength({ min: 6 })
//     .withMessage('password at least 6 character'),
// ],
