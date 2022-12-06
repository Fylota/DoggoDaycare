const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fad7xe', { useNewUrlParser: true });

module.exports = mongoose;