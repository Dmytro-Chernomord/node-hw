const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact } = require('./contacts.controller');
const { createContactSchema } = require('./user.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact)


exports.contactsRouter = router