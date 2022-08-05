import cartUser from '../models/cartmodel.mjs';
export const addItemToCart = (req, res) => {
  cartUser.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ message: error });
    if (cart) {
      //if cart already exist then update the cart by quantity
      //   return res.status(201).json({ message: cart });
      let product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      if (item) {
        cartUser
          .findOneAndUpdate(
            {
              user: req.user._id,
              'cartItems.product': product,
            },
            {
              $set: {
                cartItems: {
                  ...req.body.cartItems,
                  quantity: item.quantity + req.body.cartItems.quantity,
                },
              },
            }
          )
          .exec((error, cart) => {
            if (error) return res.status(400).json({ error: error });
            if (cart) return res.status(201).json({ cart: cart });
          });
      } else {
        cartUser
          .findOneAndUpdate(
            { user: req.user._id },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            }
          )
          .exec((error, cart) => {
            if (error) return res.status(400).json({ error: error });
            if (cart) return res.status(201).json({ cart: cart });
          });
      }
    } else {
      //if cart not exist then create a new cart
      const cart = new cartUser({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ message: error });
        if (cart) return res.status(201).json({ message: cart });
      });
    }
  });
};
