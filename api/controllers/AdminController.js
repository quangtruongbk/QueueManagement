/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
var winston = require('winston');
const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

module.exports = {
    login: function (req, res) {
        if (req.user != null) return res.send("Already logged in");
        passport.authenticate('admin', {
            successRedirect: '/admin/employee',
            failureRedirect: '/admin/login'
        }, function (err, account, info) {
            if (err) {
                logger.error("Admin Login Error: " + err);
                return res.send(err);
            }
            if (!account) {
                return res.view('AdminView/AdminLogin', { status: '401' });
            }
            if ((err) || (!account)) {
                return res.send({
                    message: info.message,
                    account
                });
            }
            req.logIn(account, function (err) {
                if (err) {
                    logger.error("Admin Login Error: " + err);
                    return res.send(err);
                }
                req.session.role = 'Admin';
                return res.redirect('/admin/home');
            });
        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            if (err) {
                logger.error("Admin Logout Error: " + err);
                return res.send({
                    message: err,
                });
            }
            return res.redirect('/admin/login');
        });
    },

    changePassword: function (req, res) {
        var accId = req.user.id;
        var oldPassword = req.param('oldpassword');
        var newPassword = req.param('newpassword');

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newPassword, salt, null, function (err, hash) {
                if (err) return res.send(err);
                newPassword = hash;
                Account.findOne({ id: accId }).exec(function (err, account) {
                    if (err) {
                        logger.error("Admin Change Password Error: " + err);
                        return res.send(err);
                    }
                    bcrypt.compare(oldPassword, account.password, function (err, isMatch) {
                        if (err) {
                            logger.error("Admin Change Password Error: " + err);
                            return cb(err);
                        }
                        if (!isMatch) {
                            return res.view('AdminView/AdminChangePass', { status: '406' });
                        } else {
                            Account.updateOne({ id: accId }, { password: newPassword }).exec(function (err) {
                                if (err) {
                                    logger.error("Admin Change Password Error: " + err);
                                    return res.send(err);
                                }
                                res.view('AdminView/AdminChangePass', { status: '200' });
                            });
                        }
                    });
                });

            });
        });
    },

    adminInfo: function (req, res) {
        var accountID = req.user.id;
        console.log(accountID);
        Account.findOne({ id: accountID, isAdmin: true }).exec(function (err, account) {
            if (err) {
                logger.error("Admin Infomation Error: " + err);
                res.send(500, { error: 'Database Error' });
            }
            res.view('AdminView/AdminInfo', { account: account });
        });
    },

    createEmpAccountView: function (req, res) {
        Branch.find({}).exec(function (err, branch) {
            if (err) {
                logger.error("Get Branch Infomation Error: " + err);
                res.send(500, { error: 'Database Error' });
            }
            res.view('AdminView/AdminCreateEmployee', { branch: branch });
        });
    },

    changeInfoEmpView: async function (req, res) {
        var accID = req.param('accountid');
        var branch;
        try {
            branch = await Branch.find({});
        } catch (err) {
            logger.error("Get Branch Infomation Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var account;
        try {
            account = await Account.findOne({ id: accID });
        } catch (err) {
            logger.error("Get Account Infomation Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var employee;
        try {
            employee = await Employee.findOne({ accountID: accID });
        } catch (err) {
            logger.error("Get Employee Infomation Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }
        res.view('AdminView/AdminChangeInfoEmployee', { branch: branch, account: account, employee: employee });

    },

    changeInfoEmp: async function (req, res) {
        var name = req.param('fullname').trim();
        var accountID = req.param('accountid');
        var phone = req.param('phone').trim();
        var email = req.param('email').trim();
        var role = req.param('role');
        var shift = req.param('shift').trim();
        var roleJsonArr = [];
        var roleArr = role.split(',');

        console.log("FULL NAME: " + name);
        for (var i = 0; i < roleArr.length - 1; i++) {
            var temp = "";
            temp = roleArr[i].split(' ');
            roleJsonArr.push({
                branchID: temp[0].trim(),
                role: temp[1].trim()
            })
        }

        var roleJSON = JSON.stringify(roleJsonArr);
        Account.update({ id: accountID }, { name: name, email: email, phone: phone }).exec(function (err, account) {
            if (err) {
                logger.error("Update Account Infomation Error: " + err);
                return res.status(500).send('Database Error' + err);
            }
        })

        Employee.update({ accountID: accountID }, { role: roleJSON, shift: shift }).exec(function (err, account) {
            if (err) {
                logger.error("Update Employee Infomation Error: " + err);
                return res.status(500).send('Database Error' + err);
            }
        })
        return res.send("Account successfully changed infomation!");
    },

    createEmpAccount: async function (req, res) {
        var username = req.param('username').trim();
        var name = req.param('fullname').trim();
        var phone = req.param('phone').trim();
        var email = req.param('email').trim();
        var role = req.param('role');
        var password = req.param('password');
        var shift = req.param('shift').trim();
        var roleJsonArr = [];
        if (role != null) {
            var roleArr = role.split(',');

            for (var i = 0; i < roleArr.length - 1; i++) {
                var temp = "";
                temp = roleArr[i].split(' ');
                roleJsonArr.push({
                    branchID: temp[0].trim(),
                    role: temp[1].trim()
                })
            }
            var roleJSON = JSON.stringify(roleJsonArr);
        } else {
            roleJSON = role;
        }
        Account.find({ or: [{ username: username }, { email: email }] }).limit(1).exec(function (err, account) {
            if (err) {
                logger.error("Get Account Infomation Error: " + err);
                return res.status(500).send('Database Error' + err);
            }
            if (account.length) {
                return res.send('Username or Email already been used');
            }
            //        res.redirect('/');
        });
        var newAccount;
        try {
            newAccount = await Account.create({
                name: name, email: email, phone: phone, username: username, password: password, isEmp: '1', status: '1'
            }).fetch();
        } catch (err) {
            logger.error("Create New Account Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        Employee.create({ accountID: newAccount.id, role: roleJSON, shift: shift }).exec(function (err, account) {
            if (err) {
                logger.error("Create New Employee Error: " + err);
                return res.status(500).send('Database Error' + err);
            }
        })

        return res.send("Account successfully created!");

    },

    searchEmpAcc: function (req, res) {
        var page = req.param('page');
        var keyword = req.param('keyword').trim();
        var regex = new RegExp([".*", keyword, ".*"].join(""), "i");
        var db = Account.getDatastore().manager; //Connect to MongoDB 
        var accountDatabase = db.collection('account'); //Connect to 'branch' collection 
        accountDatabase.find({ $or: [{ name: regex, isEmp: true }, { username: regex, isEmp: true }] }).skip((page - 1) * 10).limit(10).toArray(function (err, result) {
            if (err) {
                logger.error("Search Account Error: " + err);
                throw err;
            }
            var account = JSON.parse(JSON.stringify(result));
            console.log(account);
            res.view('AdminView/AdminSearchEmployee', { account: account, keyword: keyword });
        });
    },

    allEmpView: function (req, res) {
        var page = req.param('page');
        if (page == null) page = 1;
        Account.find({ isEmp: true }).skip((page - 1) * 10).limit(10).exec(function (err, account) {
            if (err) {
                logger.error("Search Account Error: " + err);
                return res.status(500).send('Database Error' + err);
            }
            res.view('AdminView/AdminAllEmployee', { account: account });
        });
    },

    fullInfoEmployee: async function (req, res) {
        var accID = req.param('accountid');

        var branch;
        try {
            branch = await Branch.find({});
        } catch (err) {
            logger.error("Get Branch Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var account;
        try {
            account = await Account.findOne({ id: accID });
        } catch (err) {
            logger.error("Get Account Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var employee;
        try {
            employee = await Employee.findOne({ accountID: accID });
        } catch (err) {
            logger.error("Get Employee Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }
        res.view('AdminView/AdminFullInfoEmployee.ejs', { branch: branch, account: account, employee: employee });

    },

    dataView: async function (req, res) {
        var date = new Date();
        logger.error("Test dataview");
        var noOfBranch;
        try {
            noOfBranch = await Branch.count({ status: { '!=': '-1' } });
        } catch (err) {
            logger.error("Get Branch Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var noOfQueue;
        try {
            noOfQueue = await Queue.count({ status: { '!=': '-1' } });
        } catch (err) {
            logger.error("Get Queue Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var noOfCustomer;
        try {
            noOfCustomer = await Account.count({ status: { '!=': '-1' }, isEmp: false });
        } catch (err) {
            logger.error("Get Customer Account Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }

        var noOfEmp;
        try {
            noOfEmp = await Account.count({ status: { '!=': '-1' }, isEmp: true });
        } catch (err) {
            logger.error("Get Employee Info Error: " + err);
            switch (err.name) {
                case 'UsageError': return res.badRequest(err);
                default: throw err;
            }
        }
        res.view('AdminView/AdminSystemData', { noOfBranch: noOfBranch, noOfQueue: noOfQueue, noOfCustomer: noOfCustomer, noOfEmp: noOfEmp });
    },

    activeAccount: function (req, res) {
        var accountID = req.param('accountID');
        Account.updateOne({ id: accountID }, { status: '1' }).exec(function (err) {
            if (err) {
                logger.error("Active Account Error: " + err);
                res.send(500, { error: 'Database Error' });
            }

            res.send("Active account successfully");
        });
    },

    deactiveAccount: function (req, res) {
        var accountID = req.param('accountID');
        Account.updateOne({ id: accountID }, { status: '-1' }).exec(function (err) {
            if (err) {
                logger.error("Deactive Account Error: " + err);
                res.send(500, { error: 'Database Error' });
            }

            res.send("Deactive account successfully");
        });
    },
};

