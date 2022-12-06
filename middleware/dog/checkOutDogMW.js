/**
 * Changes a dog's status to CHECKEDOUT based on :dogid, the entity used here is: res.locals.dog
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.dog.isHere = false;
        res.locals.dog.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/home');
        });
    };
};