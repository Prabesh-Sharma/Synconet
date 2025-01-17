import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Access from process.env
  api_key: process.env.CLOUDINARY_API_KEY, // Access from process.env
  api_secret: process.env.CLOUDINARY_API_SECRET, // Access from process.env
})

export default cloudinary
