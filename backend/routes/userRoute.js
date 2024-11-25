const { userMiddleware } = require('../auth/UserAuth')
const { Signup, Testmail, LoginAcc, GetUserProfile, logOutUser, VerifyEmail, ChangeProfileImage, ChangeUserPassword, VerifyPasswordChange, sendOtpForPasswordChange, CreateQuestion, getAllUsersQuestions, populateBadges, assignBadge, AnswerAQuestion, fetchAllQuestions, UpvoteAnAnswer, fetchAllUpvoteCountUsers, getSingleQuestionPost, getSingleUser } = require('../controllers/userController')

 const router = require('express').Router()

//Non Auth routes
 router.post('/signup', Signup) //working
 router.post('/login', LoginAcc) //working
 router.post('/email_verify', VerifyEmail) //working


 //Auth routes
 //profiles
 router.get('/profile', userMiddleware, GetUserProfile) //working
 router.get('/getsingle_user/:id', userMiddleware, getSingleUser) //working
 router.post('/upload_profileimg', userMiddleware, ChangeProfileImage) //working
 router.post('/otp_for_password', userMiddleware, sendOtpForPasswordChange)
 router.post('/verify_otp_for_password', userMiddleware, VerifyPasswordChange) //working
 router.post('/change_password', userMiddleware, ChangeUserPassword) //working

 //Questions / Blogs routes
 router.post('/create_questions', userMiddleware, CreateQuestion) //working
 router.post('/comment', userMiddleware, AnswerAQuestion) //working
 router.get('/fetch_questions', userMiddleware, fetchAllQuestions) //working
 router.post('/upvote_an_answer', userMiddleware, UpvoteAnAnswer) //working
 router.get('/get_users_questions', userMiddleware, getAllUsersQuestions) //working
 router.get('/get_upvote_voters', userMiddleware, fetchAllUpvoteCountUsers) //working
 router.get('/get_one_user_questions', userMiddleware, getAllUsersQuestions) //working
 router.get('/get_single_question/:id', userMiddleware, getSingleQuestionPost) //working



 router.post('/logout', userMiddleware, logOutUser)//working
 //email test route
 router.post('/testmail', Testmail)

 module.exports = router