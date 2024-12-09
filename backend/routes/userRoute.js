const { userMiddleware } = require('../auth/UserAuth')
const { Signup, Testmail, LoginAcc, GetUserProfile, logOutUser, VerifyEmail, ChangeProfileImage, ChangeUserPassword, VerifyPasswordChange, sendOtpForPasswordChange, CreateQuestion, getAllUsersQuestions, AnswerAQuestion, fetchAllQuestions, UpvoteAnAnswer, fetchAllUpvoteCountUsers, getSingleQuestionPost, getSingleUser, resendOTP, resendOtpForEmailVerification, findAccount, UpdateProfile, emailSub, getASingleAnswer, updateQuestion, updateAnswer, deleteAnswer, deleteQuestion, getAllTypesOfNotifications, getAllCategories, getAllUserNotifications, ContactUs, depopulateCategories, getQuestionTrends, UnvoteAnAnswer } = require('../controllers/userController')
const { populateBadgeNames } = require('../utils/badgeScript')
const { uploadCategories } = require('../utils/categoriesScript')

const router = require('express').Router()
//Non Auth routes
router.post('/signup', Signup) //working
router.post('/login', LoginAcc) //working
router.post('/resend_otp', resendOTP) //working
router.post('/email_verify', VerifyEmail) //working
router.post('/contact_us', ContactUs) //working
router.post('/resend_otp_for_email_verify', resendOtpForEmailVerification) //working

//forgot password
router.get(`/find_account/:email`, findAccount)//working
router.post('/otp_for_password', sendOtpForPasswordChange)//working
router.post('/change_password', ChangeUserPassword) //working

//newsletter
router.post('/email_sub', emailSub) //working

//handle notifcation types
router.get('/get_notice_types', getAllTypesOfNotifications) //working

//upload and fetch categories/badges
router.post('/upload_categories', uploadCategories)//working
router.get('/fetch_all_categories',userMiddleware, getAllCategories)//working
router.post('/populate_badges', populateBadgeNames)//working
//Auth routes
//profiles
router.get('/profile', userMiddleware, GetUserProfile) //working
router.put('/update_profile', userMiddleware, UpdateProfile) //working
router.get('/getsingle_user/:id', userMiddleware, getSingleUser) //working
router.post('/upload_profileimg', userMiddleware, ChangeProfileImage) //working
router.post('/verify_otp_for_password', userMiddleware, VerifyPasswordChange) //working
router.post('/auth_change_password', userMiddleware, ChangeUserPassword) //working
router.post('/get_user_notifications', userMiddleware, getAllUserNotifications) //working

//Questions / Blogs routes
router.post('/create_question', userMiddleware, CreateQuestion) //working
router.post('/update_question', userMiddleware, updateQuestion) //working
router.delete('/delete_question/:id', userMiddleware, deleteQuestion)

router.post('/comment_answer', userMiddleware, AnswerAQuestion) //working
router.post('/update_answer', userMiddleware, updateAnswer) //working
router.delete('/delete_answer/:id', userMiddleware, deleteAnswer) //working
router.get('/fetch_all_questions', userMiddleware, fetchAllQuestions) //working
router.post('/upvote_an_answer', userMiddleware, UpvoteAnAnswer) //working
router.post('/unvote_an_answer', userMiddleware, UnvoteAnAnswer) //working
router.get('/get_users_questions', userMiddleware, getAllUsersQuestions) //working
router.get('/get_upvote_voters', userMiddleware, fetchAllUpvoteCountUsers) //working
router.get('/get_one_user_questions', userMiddleware, getAllUsersQuestions) //working
router.get('/get_single_question/:id', userMiddleware, getSingleQuestionPost) //working
router.get('/get_single_answer', userMiddleware, getASingleAnswer) //working


router.post('/logout', userMiddleware, logOutUser)//working
//email test route
router.post('/testmail', Testmail)//working

router.post('/remove_cati',depopulateCategories)//for admin only
router.get('/trends',getQuestionTrends)

module.exports = router