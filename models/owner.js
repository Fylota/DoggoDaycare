const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Owner = db.model('Owner', {
    name: String,
    email: String,
    phone: String
});

module.exports = Owner;