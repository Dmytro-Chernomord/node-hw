const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { imageCreator } = require('../helpers/imageCreator');
const { validate } = require('../helpers/validate.middleware');
const { createUserSchema, loginSchema } = require('../user/user.schemes');
const { register, login, logout, avatar } = require('./auth.controller');
const router = Router()

router.post('/register', validate(createUserSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', authorize, logout)

exports.routerAuth = router