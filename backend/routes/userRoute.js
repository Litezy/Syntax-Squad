const { getUser } = require('../controllers/userController')

 const router = require('express').Router()


 router.get('/get',getUser)

 module.exports = router