const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/item', require('./routes/items'));

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
