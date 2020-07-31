const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route       POST api/item
// @dsc         Create new item
// @access      PRIVATE
router.post(
  '/',
  [
    check('item_name', 'Please add a item name').notEmpty(),
    check('price', 'Please include price for item').notEmpty().isNumeric(),
    check('number', 'Please Enter a valid number').isLength({
      min: 10,
    }),
    check('address', 'Please add a address').notEmpty(),
    check('location', 'Please add a location').notEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      _id,
      item_name,
      price,
      number,
      address,
      location,
      images,
    } = req.body;

    try {
      let item = await Item.findOne({ item_name });

      if (item) {
        return res.status(400).json({ msg: 'Item already exists' });
      }

      item = new Item({
        _id,
        item_name,
        price,
        number,
        address,
        location,
        images,
        user: req.user.id,
      });

      await item.save();
      return res.json({ item });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// // @route       PUT api/item/:id
// // @dsc         Update item
// // @access      Private
// router.put('/:id', auth, async (req, res) => {
//   const { item_name, price, number, address, location, images } = req.body;

//   // Build a item Object
//   const itemFields = {};
//   if (item_name) itemFields.item_name = item_name;
//   if (price) itemFields.price = price;
//   if (number) itemFields.number = number;
//   if (address) itemFields.address = address;
//   if (location) itemFields.location = location;
//   if (images) itemFields.images = images;

//   try {
//     // console.log(req.params.id);
//     let item = await Item.findById(req.params.id);

//     if (!item) return res.status(404).json({ msg: 'item not found' });

//     // Make sure user owns item
//     if (item.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     item = await Item.findByIdAndUpdate(req.params);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route       DELETE api/contacts/:id
// // @dsc         Delete contact
// // @access      Private
// router.delete('/:id', (req, res) => {
//   res.send('Delete contact');
// });

module.exports = router;
