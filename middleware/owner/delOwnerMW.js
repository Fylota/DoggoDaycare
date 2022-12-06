/**
 * Removes an owner from database based on :ownerid, the entity used here is: res.locals.owner
 * Redirects to /owner after delete
 */
 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        if (typeof res.locals.owner === 'undefined') {
            return next();
        }

        res.locals.owner.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/owner');
        });
     };
 };