import productUser from '../models/productmodel.mjs';
import slugify from 'slugify';
// import shortid from 'shortid';

export const product = (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body });
  const { name, description, price, category, quantity, createdBy } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new productUser({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(201).json({ product, files: req.files });
  });
};
