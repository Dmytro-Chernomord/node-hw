const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact, getContactsList, getContactById, deleteContactReq, patchContact } = require('./contacts.controller');
const { createContactSchema, patchContactSchema, vildateId } = require('./contacts.schemes');
const router = Router();
router.post('/', validate(createContactSchema), createContact)
router.get('/', getContactsList)
router.get('/:id', validate(vildateId, "params"), getContactById)
router.patch('/:id', validate(vildateId, "params"), validate(patchContactSchema), patchContact)
router.delete('/:id', validate(vildateId, "params"), deleteContactReq)
exports.contactsRouter = router