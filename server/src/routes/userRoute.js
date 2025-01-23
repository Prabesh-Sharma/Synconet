import userController from '../controllers/userController.js'
import catchAsyncErr from '../services/catchAsync.js'
import protect from '../middlewares/isAuthenticated.js'
import { UploadProfilePicture } from '../controllers/Uploading.js'
import upload from '../middlewares/multer.js'
import { Router } from 'express'

const router = Router()

router.route('/register').post(catchAsyncErr(userController.register))
router.route('/login').post(catchAsyncErr(userController.login))
router.route('/getuserinfo').get(protect, catchAsyncErr(userController.getUserInfo))
router.route('/verify-email').get(catchAsyncErr(userController.verifyEmail))
router.route('/uploadProfilePic').post(protect, upload.single('profilePic'), UploadProfilePicture)
router.route('/sendfriendreq').post(protect, catchAsyncErr(userController.sendFriendReq))
router.route('/getfriendreq').get(protect, catchAsyncErr(userController.getFriendReq))
router.route('/changepass').post(protect, catchAsyncErr(userController.changePassword))

export default router
