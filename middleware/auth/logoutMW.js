/**
 * Logging out and redirecting to /.
 */
 const requireOption = require('../common/requireOption');

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        req.session.destroy(err => {
            res.redirect('/');
        });
     };
 };