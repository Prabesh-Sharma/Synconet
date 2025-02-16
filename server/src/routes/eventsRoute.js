import { Router } from 'express'
import catchAsyncErr from '../services/catchAsync.js'
import protect from '../middlewares/isAuthenticated.js'
import eventsController from '../controllers/eventsController.js'

const router = Router()

router.route('/set').post(protect, catchAsyncErr(eventsController.setEvents))
router.route('/get').get(catchAsyncErr(eventsController.getEvents))

export default router
