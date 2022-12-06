const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Dog = db.model('Dog', {
    name: String,
    breed: String,
    dateOfBirth: String,
    info: String,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    },
    isHere: Boolean
});

module.exports = Dog;