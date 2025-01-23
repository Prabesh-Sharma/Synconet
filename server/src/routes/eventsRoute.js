import { Router } from 'express'
import upload from '../middlewares/multer.js'
import { UploadEventPicture } from '../controllers/Uploading.js'
import catchAsyncErr from '../services/catchAsync.js'
import protect from '../middlewares/isAuthenticated.js'
import eventsController from '../controllers/eventsController.js'

const router = Router()

router.route('/set').post(protect, catchAsyncErr(eventsController.setEvents))
router.route('/uploadEventPic').post(protect, upload.single('eventPic'), catchAsyncErr(UploadEventPicture))

export default router
