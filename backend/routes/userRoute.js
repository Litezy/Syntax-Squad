const { Signup, Testmail } = require('../controllers/userController')

 const router = require('express').Router()


 router.post('/signup', Signup)
 router.post('/testmail', Testmail)

 module.exports = router