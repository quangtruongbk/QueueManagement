/**
 * BranchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getBranchList: function (req, res) {
        Branch.find({}).exec(function (err, branch) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view('BranchView/BranchList', { branch: branch }); //Tro toi file EJS chua view do, route la toi /homepage, nhung trong route se goi ham list, ham list se tro ra view EJS
        });
    },
    getBranchListJSON: function (req, res) {
        Branch.find({}).exec(function (err, branch) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.json(branch);
        });
    },

    create: function (req, res) {
        var branchName = req.query.branchName;
        var branchAddress = req.query.branchAddress;
        var branchPhone = req.query.branchPhone;
        var branchOpenTime = req.query.branchOpenTime;
        var branchCloseTime = req.query.branchCloseTime;
        var branchCapacity = req.query.branchCapacity;
        var branchStatus = req.query.branchStatus;
        Branch.create({ name: branchName, address: branchAddress, phone: branchPhone, opentime: branchOpenTime, closetime: branchCloseTime, capacity: branchCapacity, status: branchStatus }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('/');
        });
    },

    changeInfo: function (req, res) {
        var branchId = req.query.branchId;
        var branchName = req.query.branchName;
        var branchAddress = req.query.branchAddress;
        var branchPhone = req.query.branchPhone;
        var branchOpenTime = req.query.branchOpenTime;
        var branchCloseTime = req.query.branchCloseTime;
        var branchCapacity = req.query.branchCapacity;
        var branchStatus = req.query.branchStatus;
        Branch.updateOne({ id: branchId }, { name: branchName, address: branchAddress, phone: branchPhone, opentime: branchOpenTime, closetime: branchCloseTime, capacity: branchCapacity, status: branchStatus }).exec(function (err) {
            if (err) {
                console.log(err);
                res.send(500, { error: 'Database Error' });
            }
            else {
                console.log("Update info branch thanh cong");
            }

            //   res.redirect('/');
        });
    },

    searchBranch: function (req, res) {
        console.log('search branch');
        var keyword = req.params.branchKeyword;
        /*  var db = Branch.getDatastore().manager;
          db.createCollection("branch", { collation: { locale: 'vi', strength: 2 } } );
          db.branch.createIndex( { name: 1 } );
          db.branch.find({name: 'co'});  */

        /*  var comment = db.collection(Branch.tableName);
          comment.find({name:{'$regex' : keyword, '$options' : 'i'}}).exec(function(err, branch){
              if(err){
                  console.log(err);
                  res.send(500, {error: 'Database Error'});
              }
              res.json(branch);
          });; */

        /* Branch.find({'name': {'like': keyword}}).exec(function(err, branch){
             if(err){
                 console.log(err);
                 res.send(500, {error: 'Database Error'});
             }
             res.json(branch);
         });  */

        //TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
        var regex = new RegExp([".*", keyword, ".*"].join(""), "i");
        var db = Branch.getDatastore().manager; //Connect to MongoDB 
        var branchDatabase = db.collection('branch'); //Connect to 'branch' collection 
        var data = {};
        branchDatabase.find({ name: regex }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(JSON.parse(JSON.stringify(result)));
        });
    },
};

