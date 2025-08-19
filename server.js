const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // folder to store images

// Serve static files (frontend page)
app.use(express.static('public'));

// Receive uploaded images from iPhone
app.post('/upload', upload.single('image'), (req, res) => {
  console.log('Received:', req.file.originalname);
  // Save latest image as latest.jpg
  const fs = require('fs');
  fs.copyFileSync(req.file.path, path.join(__dirname, 'public', 'latest.jpg'));
  res.send('Uploaded!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
