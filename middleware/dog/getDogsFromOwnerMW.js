/**
 * Load all dogs belonging to current owner from the database
 * The result is saved to res.locals.dogs
 */
 const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');

    return function (req, res, next) {
        if (typeof res.locals.owner === 'undefined') {
            return next();
        }

        DogModel.find({ _owner: res.locals.owner._id }, (err, dogs) => {
            if (err) {
                return next(err);
            }

            res.locals.dogs = dogs;
            return next();
        });
    };
};