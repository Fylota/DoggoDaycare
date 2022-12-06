/**
 * Load all dogs that are currently in the daycare from the database
 * The result is saved to res.locals.dogsHere
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');

    return function (req, res, next) {
        DogModel.find({isHere: true}, (err, dogs) => {
            if (err) {
                return next(err);
            }

            res.locals.dogs = dogs;
            return next();
        });
    };
};