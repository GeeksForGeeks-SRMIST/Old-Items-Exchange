const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const { response } = require('express');
const { findByIdAndDelete } = require('../models/Item');
const ObjectId = mongoose.Types.ObjectId;

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
    const { item_name, price, number, address, location, images } = req.body;

    try {
      let item = await Item.findOne({ item_name });

      if (item) {
        return res.status(400).json({ msg: 'Item already exists' });
      }

      item = new Item({
        item_name,
        price,
        number,
        address,
        location,
        images,
        user: req.user.id,
      });

      await item.save();
      return res.json({ msg: 'Item Added Successfully!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/item/:id
// @dsc         Update item
// @access      Private
router.put(
  '/:id',
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
    const { item_name, price, number, address, location, images } = req.body;

    const itemFields = {};
    if (item_name) itemFields.item_name = item_name;
    if (price) itemFields.price = price;
    if (number) itemFields.number = number;
    if (address) itemFields.address = address;
    if (location) itemFields.location = location;
    if (images) itemFields.images = images;

    let item = new Item({
      item_name,
      price,
      number,
      address,
      location,
      images,
      user: req.user.id,
    });
    try {
      item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ msg: 'Item not found' });

      // Make sure user owns Contact
      if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json({ msg: 'Item Updated Successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/item/:id
// @dsc         Update item
// @access      Private
router.get('/list', auth, async (req, res) => {
  try {
    let items = await Item.find({});
    return res.json({ items });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/contacts/:id
// @dsc         Delete contact
// @access      Private
router.delete('/:id', async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await Item.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Item deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
