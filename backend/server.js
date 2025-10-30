// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Folder to store uploaded files
const UPLOADS_FOLDER = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_FOLDER)) fs.mkdirSync(UPLOADS_FOLDER);

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

// Fetch All Files
app.get('/files', (req, res) => {
  fs.readdir(UPLOADS_FOLDER, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const formattedFiles = files.map(name => ({ name }));
    res.json(formattedFiles);
  });
});

// Download File
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(UPLOADS_FOLDER, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
