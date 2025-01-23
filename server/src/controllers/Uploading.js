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

export const UploadEventPicture = async (req, res) => {
  const eventPic = req.file
  const { eventId } = req.body

  const user = await User.findById(req.user)
  const event = await Event.findById(eventId)

  if (!eventPic) {
    return res.status(400).json({
      error: 'no eventpic selected',
    })
  }

  if (!event.owner.equals(user._id)) {
    return res.status(403).json({
      error: 'authentication error',
    })
  }

  const result = await cloudinary.uploader.upload(eventPic.path, { folder: 'Synconet' })
  console.log(result)
  if (result) {
    event.image = result.url
    await event.save()
    fs.unlinkSync(eventPic.path)
    return res.status(200).json({
      status: 'success',
      data: result,
    })
  }
  return res.status(500).json({
    status: 'fail',
    message: 'didnot uploaded any files',
  })
}
