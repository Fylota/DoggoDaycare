/**
 * Load a dog from the database using the :dogid param
 * The result is saved to res.locals.dog
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');

    return function (req, res, next) {
        DogModel.findOne({_id: req.params.dogid}, (err, dog) => {
            if (err || !dog) {
                return next(err);
            }

            res.locals.dog = dog;
            return next();
        });
    };
};