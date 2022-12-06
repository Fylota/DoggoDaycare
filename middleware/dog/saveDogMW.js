/**
 * Using POST params update or save a dog to the database
 * If res.locals.dog is there, it's an update otherwise this middleware creates an entity
 * Redirects to /dog after success
 */
const Owner = require('../../models/owner');
const requireOption = require('../common/requireOption');

module.exports = function (objectrepository) {
    const DogModel = requireOption(objectrepository, 'DogModel');
    const OwnerModel = requireOption(objectrepository, 'OwnerModel');

    return function (req, res, next) {
        if (typeof req.body.name === 'undefined' ||
            typeof req.body.breed === 'undefined' ||
            typeof req.body.dateOfBirth === 'undefined' ||
            typeof req.body.owner === 'undefined') {
                return next();
        }

        if (typeof res.locals.dog === 'undefined') {
            res.locals.dog = new DogModel();
        }

        if (typeof res.locals.owner === 'undefined') {
            res.locals.owner = new OwnerModel();
        }

        OwnerModel.findOne({_id: req.body.owner.trim()}, (err, owner) => {
            if (err || !owner) {
                return next(err);
            }

            res.locals.dog._owner = owner;
            res.locals.dog.name = req.body.name;
            res.locals.dog.breed = req.body.breed;
            res.locals.dog.dateOfBirth = req.body.dateOfBirth;

            var isTrueSet = (req.body.isHere === 'true');
            res.locals.dog.isHere = isTrueSet;
            if (typeof req.body.isHere === 'undefined') {
                res.locals.dog.isHere = false;
            }

            if (typeof req.body.info !== 'undefined') {
                res.locals.dog.info = req.body.info;
            }

            res.locals.dog.save(err => {
                if (err) {
                    return next(err);
                }
    
                return res.redirect('/dog');
            });
        });
    };
};