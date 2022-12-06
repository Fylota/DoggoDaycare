/**
 * Load an owner from the database using the :ownerid param
 * The result is saved to res.locals.owner
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const OwnerModel = requireOption(objectrepository, 'OwnerModel');

    return function (req, res, next) {
        OwnerModel.findOne({_id: req.params.ownerid}, (err, owner) => {
            if (err || !owner) {
                return next(err);
            }

            res.locals.owner = owner;
            return next();
        });
    };
};