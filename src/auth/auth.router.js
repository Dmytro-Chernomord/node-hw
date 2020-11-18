const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { checkVerification } = require('../helpers/emailSender');
const { validate } = require('../helpers/validate.middleware');
const { createUserSchema, loginSchema } = require('../user/user.schemes');
const { register, login, logout } = require('./auth.controller');
const router = Router()

router.post('/register', validate(createUserSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', authorize, logout)
router.get('/verify/:verificationToken', checkVerification);

exports.routerAuth = router