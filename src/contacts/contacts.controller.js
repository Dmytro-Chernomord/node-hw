const id = require('nanoid')
const contacts = require('../contacts')

exports.createContact = (req, res, next) => {
    try {
        contacts.addContact(req.body)
        return res.status(201).send('Created')
    } catch (error) {
        next(err)
    }
}