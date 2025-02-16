// import cloudinary from '../config/CloudinaryConfig'
import cloudinary from '../config/CloudinaryConfig.js'
import fs from 'fs'
import User from '../model/userModel.js'
import Event from '../model/eventModel.js'

export const UploadProfilePicture = async (req, res) => {
  const profilePic = req.file
  const user = await User.findById(req.user)
  console.log(profilePic)
  if (profilePic) {
    const result = await cloudinary.uploader.upload(profilePic.path, { folder: 'Synconet' })
    console.log(result)
    if (result) {
      user.profilePicture = result.url
      await user.save()
      fs.unlinkSync(profilePic.path)
      return res.status(200).json({
        status: 'success',
        data: result,
      })
    }
  }
  return res.status(500).json({
    status: 'fail',
    message: 'didnot uploaded any files',
  })
}
