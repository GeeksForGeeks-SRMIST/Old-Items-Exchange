const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Item = require('../models/item');

router.get("/",(req,res)=>{
  res.send();
});

router.post("/",(req,res)=>{
   const item = new Item({
     string: req.body.title
   });
});

module.exports = router;