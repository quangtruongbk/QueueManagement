const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');
passport.serializeUser(function (account, cb) {
    cb(null, account.id);
});
passport.deserializeUser(function (id, cb) {
    Account.findOne({ id }, function (err, accounts) {
        cb(err, accounts);
    });
});
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, cb) {
    Account.findOne({ username: username }, function (err, account) {
        if (err) return cb(err);
        if (!account) return cb(null, false, { message: 'Username not found' });
        bcrypt.compare(password, account.password, function (err, res) {
            if (!res) return cb(null, false, { message: 'Invalid Password' });
            let userDetails = {
                email: account.email,
                username: account.username,
                id: account.id
            };
            return cb(null, userDetails, { message: 'Login Succesful' });
        });
    });
}));
passport.use('admin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, cb) {
    console.log("Login test: " + username + password);
    Account.findOne({ username: username, isAdmin: true }, function (err, account) {
        if (err) return cb(err);
        if (!account) return cb(null, false, { message: 'Username not found' });
        bcrypt.compare(password, account.password, function (err, res) {
            if (!res) return cb(null, false, { message: 'Invalid Password' });
            let userDetails = {
                email: account.email,
                username: account.username,
                id: account.id
            };
            return cb(null, userDetails, { message: 'Login Succesful' });
        });
    });
}));
passport.use('employee', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, cb) {
    Account.findOne({ username: username, isEmp: true }, function (err, account) {
        if (err) return cb(err);
        if (!account) return cb(null, false, { message: 'Username not found' });
        bcrypt.compare(password, account.password, function (err, res) {
            if (!res) return cb(null, false, { message: 'Invalid Password' });
            let userDetails = {
                email: account.email,
                username: account.username,
                isEmp: account.isEmp,
                isAdmin: account.isAdmin,
                id: account.id
            };
            return cb(null, userDetails, { message: 'Login Succesful' });
        });
    });
}));

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromHeader('token'),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        return Account.findOneById(jwtPayload.id)
            .then(account => {
                return cb(null, account);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
