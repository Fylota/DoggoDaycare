/**
 * Removes a dog from database based on :dogid, the entity used here is: res.locals.dog
 * Redirects to /dog after delete
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.dog === 'undefined') {
            return next();
        }

        res.locals.dog.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/dog');
        });
    };
};