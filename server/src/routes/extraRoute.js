import { interestcnt } from '../controllers/extraController.js'
import { Router } from 'express'
import catchAsyncErr from '../services/catchAsync.js'

const router = new Router()

router.route('/interest-stats').get(catchAsyncErr(interestcnt))

export default router
