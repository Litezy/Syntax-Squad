const { userMiddleware } = require('../auth/UserAuth')
const { Signup, Testmail, LoginAcc, GetUserProfile, logOutUser, VerifyEmail, ChangeProfileImage, ChangeUserPassword, VerifyPasswordChange, sendOtpForPasswordChange, CreateQuestion, getAllUsersQuestions, populateBadges, assignBadge } = require('../controllers/userController')

 const router = require('express').Router()

//Non Auth routes
 router.post('/signup', Signup) //working
 router.post('/login', LoginAcc) //working
 router.post('/email_verify', VerifyEmail) //working
 router.post('/populate_badges', populateBadges)


 //Auth routes
 //profiles
 router.get('/profile', userMiddleware, GetUserProfile) //working
 router.post('/upload_profileimg', userMiddleware, ChangeProfileImage) //working
 router.post('/otp_for_password', userMiddleware, sendOtpForPasswordChange)
 router.post('/verify_otp_for_password', userMiddleware, VerifyPasswordChange) //working
 router.post('/change_password', userMiddleware, ChangeUserPassword) //working

 //Questions / Blogs routes
 router.post('/create_questions', userMiddleware, CreateQuestion) //working
 router.get('/get_users_questions', userMiddleware, getAllUsersQuestions) //working




 router.post('/logout', userMiddleware, logOutUser)//working


 //email test route
 router.post('/testmail', Testmail)

 module.exports = router