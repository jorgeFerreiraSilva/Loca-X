const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'user-photo',
  allowedFormats: ['jpg', 'png'],
  filename(req, file, cb) {
    console.log(file);
    
    cb(null, file.originalname);
  }
});

const parser = multer({ storage });

module.exports = parser;