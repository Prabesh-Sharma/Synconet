// import cloudinary from '../config/CloudinaryConfig'
import cloudinary from '../config/CloudinaryConfig.js'
import fs from 'fs'

export const UploadProfilePicture = async (req, res, next) => {
  const profilePic = req.file
  console.log(profilePic)
  if (profilePic) {
    const result = await cloudinary.uploader.upload(profilePic.path, { folder: 'Synconet' })
    console.log(result)
    if (result) {
      fs.unlinkSync(profilePic.path)
      return res.status(200).json({
        status: 'success',
        // message: 'Successfully uploaded the file',
        data: result,
        dataBaseMaSaveThis: result.url,
      })
    }
  }
  next()
  return res.status(500).json({
    status: 'fail',
    message: 'didnot uploaded any files',
  })
}
