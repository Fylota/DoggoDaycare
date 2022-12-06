/**
 * Using POST params update or save an owner to the database
 * If res.locals.owner is there, it's an update otherwise this middleware creates an entity
 * Redirects to /owner after success
 */
 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
    const OwnerModel = requireOption(objectrepository, 'OwnerModel');
    
     return function (req, res, next) {
        if (typeof req.body.name === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.phone === 'undefined') {
                return next();
        }

        if (typeof res.locals.owner === 'undefined') {
            res.locals.owner = new OwnerModel();
        }

        res.locals.owner.name = req.body.name;
        res.locals.owner.email = req.body.email;
        res.locals.owner.phone = req.body.phone;

        res.locals.owner.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/owner');
        });
     };
 };