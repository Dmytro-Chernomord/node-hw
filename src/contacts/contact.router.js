const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact, getContactsList, getContactById, deleteContactReq, patchContact } = require('./contacts.controller');
const { createContactSchema, patchContactSchema } = require('./contacts.schemes');
const router = Router();
router.post('/', validate(createContactSchema), createContact)
router.get('/', getContactsList)
router.get('/:id', getContactById)
router.patch('/:id', validate(patchContactSchema), patchContact)
router.delete('/:id', deleteContactReq)
exports.contactsRouter = router