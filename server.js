const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.post('/upload',(req,res)=>{
    if(req,files=== null){
        return res.status(400).json({msg:'No file Uploaded'});
    }

    const file = req.files.file;

    file.mv('${__dirname}/client/public/uploads/${file.name}',err=>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({fileName:file.name,filePath:'/uploads/${file.name}'})
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
