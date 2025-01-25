import { Router } from 'express'
import upload from '../middlewares/multer.js'
import { UploadEventPicture } from '../controllers/Uploading.js'
import catchAsyncErr from '../services/catchAsync.js'
import protect from '../middlewares/isAuthenticated.js'
import eventsController from '../controllers/eventsController.js'

const router = Router()

// Create event
router.route('/set').post(protect, catchAsyncErr(eventsController.setEvents))

// Get scheduled events (future events)
router.route('/scheduled').get(protect, catchAsyncErr(eventsController.getScheduledEvents))

// Get attended events (past events)
router.route('/attended').get(protect, catchAsyncErr(eventsController.getAttendedEvents))

export default router
