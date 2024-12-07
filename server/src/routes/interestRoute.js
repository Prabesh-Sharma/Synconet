import interestController from '../controllers/interestController.js'
import catchAsyncErr from '../services/catchAsync.js'
import protect from '../middlewares/isAuthenticated.js'

import { Router } from 'express'

const router = Router()

router.route('/get').get(protect, catchAsyncErr(interestController.getInterest))
router.route('/set').post(protect, catchAsyncErr(interestController.setInterest))
router.route('/get/recommendations').get(protect, catchAsyncErr(interestController.recommendations))

export default router
