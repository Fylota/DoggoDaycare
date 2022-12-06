/**
 * Load an owner from the database using the owner id from the res.locals.dog.
 * The result is saved to res.locals.owner
 */
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {

    const OwnerModel = requireOption(objectrepository, 'OwnerModel');

    return function (req, res, next) {
        if (typeof res.locals.dog === 'undefined') {
            return next();
        }
        
        OwnerModel.findOne({ _id: res.locals.dog._owner }, (err, owner) => {
            if (err || !owner) {
                return next(err);
            }

            res.locals.owner = owner;
            return next();
        });
        
    };
};