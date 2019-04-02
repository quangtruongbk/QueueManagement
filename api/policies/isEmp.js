var passport = require('passport');
 
module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (err, account, info) {
      if (err) return res.send(err);
      if (!account) return res.forbidden();
     req.user = account;
      console.log('isEMP');
     next();
    })(req, res);
};