/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//Passport.js Middleware for authentication
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    login: function (req, res) {
        if (req.user != null) return res.send("Already logged in");
        passport.authenticate('local', function (err, account, info) {
            if ((err) || (!account)) {
                return res.send({
                    message: info.message,
                    account
                });
            }
            req.logIn(account, function (err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    account
                });
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

    register: function (req, res) {
        var name = req.body.accountName.trim();
        var email = req.body.accountEmail.trim();
        var phone = req.body.accountPhone.trim();
        var username = req.body.accountUsername.trim();
        var password = req.body.accountPassword;
        var isEmp = req.body.isEmp;
        Account.find({ or: [{ username: username }, { email: email }] }).limit(1).exec(function (err, account) {
            if (err) {
                return res.status(500).send('Database Error' + err);
            }
            if (account.length) {
                return res.send('Username or Email already been used');
            }
            //        res.redirect('/');
        });
        Account.create({ name: name, email: email, phone: phone, username: username, password: password, isEmp: isEmp, status: '1' }).exec(function (err) {
            if (err) {
                return res.status(500).send('Database Error' + err);
            }
            //        res.redirect('/');
        });
        return res.send("Account successfully created!");
    },

    verifyEmail: function (req, res) {
        var accountID = req.param('id');
        Account.updateOne({ id: accountID }, { status: '1' }).exec(function (err) {
            if (err) {
                return res.status(500).send('Database Error' + err);
            }
            return res.status(400).send('Verify successfully');
        });
    },

    changeInfo: function (req, res) {
        var accId = req.body.accId;
        var name = req.body.name.trim();
        var email = req.body.email.trim();
        var phone = req.body.phone.trim();
        Account.updateOne({ id: accId }, { name: name, email: email, phone: phone }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('/');
        });
    },

    changePassword: function (req, res) {
        var accId = req.param('accountid');
        var password = req.param('password');
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                if (err) return res.send(err);
                console.log(hash);
                password = hash;
                Account.updateOne({ id: accId }, { password: password }).exec(function (err) {
                    if (err) {
                        return res.send(500, { error: 'Database Error' });
                    }
                    res.redirect('/');
                });

            });
        });
        return res.send("Change password successfully");
    },

    delete: function (req, res) {
        Account.destroy({ id: req.params.id }).exec(function (err) { //doubt
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('/');
        });

        return false;
    },

    searchAccount: function (req, res) {
        var keyword = req.body.keyword;
        var regex = new RegExp([".*", keyword, ".*"].join(""), "i");
        var db = Account.getDatastore().manager; //Connect to MongoDB 
        var accountDatabase = db.collection('account'); //Connect to 'branch' collection 
        accountDatabase.find({ name: regex }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(JSON.parse(JSON.stringify(result)));
        });
    },


};

