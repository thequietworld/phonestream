const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Folder to store uploaded images temporarily
const upload = multer({ dest: 'uploads/' });

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Receive uploaded images from iPhone
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Received:', req.file.originalname);
    // Save latest image as latest.jpg in public folder
    fs.copyFileSync(req.file.path, path.join(__dirname, 'public', 'latest.jpg'));
    res.send('Uploaded!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
