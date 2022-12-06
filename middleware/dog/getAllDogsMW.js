/**
 * Load all dogs that from the database
 * The result is saved to res.locals.dogs
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');

    return function (req, res, next) {
        DogModel.find({}, (err, dogs) => {
            if (err) {
                return next(err);
            }

            res.locals.dogs = dogs;
            return next();
        });
    };
};