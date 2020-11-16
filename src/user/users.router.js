const { Router } = require('express')
const { authorize } = require('../helpers/authorize.middleware')
const { imageCreator } = require('../helpers/imageCreator')
const { getCurretUser, avatar } = require('./users.controller')


const router = Router()

router.get('/current', authorize, getCurretUser)
router.patch('/avatar', authorize, imageCreator, avatar)

exports.userRouter = router