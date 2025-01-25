import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Resolve the path correctly to avoid double C:\
const uploadPath = path.join(path.resolve(), 'uploads');

// Ensure the uploads folder exists, create it if necessary
fs.mkdirSync(uploadPath, { recursive: true });

// Set up multer storage
const upload = multer({ dest: uploadPath });

export default upload;
