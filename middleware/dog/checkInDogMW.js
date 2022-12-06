/**
 * Changes a dog's status to CHECKEDIN based on :dogid, the entity used here is: res.locals.dog
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');
    return function (req, res, next) {
        res.locals.dog.isHere = true;
        res.locals.dog.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/dog');
        });
    };
};