/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /.
 * 
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'admin') {
            req.session.loggedin = true;
            return req.session.save(err => res.redirect('/home'));
        }

        res.locals.error = 'Wrong password!';
        return next();
    };
};