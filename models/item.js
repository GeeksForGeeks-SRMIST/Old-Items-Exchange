const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    images:{
        type: String,
        required: true
    },
})