const { fetchNothing } = require('../controllers/userControllers')

const router = require('express').Router()

router.get('/', fetchNothing)
module.exports = router