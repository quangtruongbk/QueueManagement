/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    login: function (req, res) {
        if (req.user != null) return res.send("Already logged in");
        passport.authenticate('employee', {session: false} , function (err, account, info) {
            if ((err) || (!account)) {
                return res.send({
                    message: info.message,
                    account
                });
            }
            req.logIn(account, {session: false}, function (err) {
                if (err) res.send(err);
                const token = jwt.sign(account, 'your_jwt_secret');
                var result = account;
                result["token"] = token; //Add field token to result
                return res.json(result);
            });
        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        req.session.destroy(function(err) {
            if(err) return res.send({
                message: err,
            });
            return res.redirect('/');
       }); 
    },

    create:function(req, res){
        var accId = req.query.accId;
        var role = req.query.role;
        var shift = req.query.shift;
        var branchId = req.query.branchId;
        Employee.create({accountID:accId, role:role, shift:shift, branchID: branchId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/');
        }); 
    },

    changeInfo:function(req, res){
        var employeeId = req.query.employeeId;
        var role = req.query.role;
        var shift = req.query.shift;
        var branchId = req.query.branchId;
        Employee.updateOne({accountID:employeeId}, {role:role, shift:shift, branchID: branchId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/');
        }); 
    },

    test:function(req, res){
        console.log("Test JWT");
        console.log(req);
        console.log(req.headers);
        const passportJWT = require("passport-jwt");
        const ExtractJWT = passportJWT.ExtractJwt;
        var x = ExtractJWT.fromAuthHeaderAsBearerToken();
        console.log(x);
        passport.authenticate('jwt', { session: false }, function (err, account) {
            if ((err)) {
                return res.send(err);
            }
            console.log(account);
        });
    },
};

