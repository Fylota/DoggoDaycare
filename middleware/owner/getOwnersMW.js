/**
 * Load all owners that from the database
 * The result is saved to res.locals.owners
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const OwnerModel = requireOption(objectrepository, 'OwnerModel');

    return function (req, res, next) {
        OwnerModel.find({}, (err, owners) => {
            if (err) {
                return next(err);
            }

            res.locals.owners = owners;
            return next();
        });
    };
};