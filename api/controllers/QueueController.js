/**
 * QueuerequestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getQueueList:function(req, res){
        var branchId = req.params.id;
        Queue.find({branch_id : branchId}).exec(function(err, queue){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('QueueView/QueueList', {queue:queue, branchID:branchId});
        });
    },

    getQueueListJSON:function(req, res){
        var branchId = req.params.id;
        Queue.find({branch_id : branchId}).exec(function(err, queue){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.json(queue);
        });
    },

    create:function(req, res){
        var queueName = req.query.queueName;
        var queueBranchId = req.query.queueBranchId;
        var queueCapacity = req.query.queueCapacity;
        Queue.create({name:queueName, branchId:queueBranchId, status:'1', capacity:queueCapacity}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/');
        }); 
    },

    changeStatus:function(req, res){
        var queueId = req.query.queueId;
        var queueStatus = req.query.queueStatus;
        Queue.updateOne({id: queueId},{status:queueStatus}).exec(function(err){
            if(err){
                console.log("error: " + "  " + err);
                res.status(500).send( {error: 'Database Error'});
            }
            else{
                console.log("Change Status thanh cong");
            }
     //       res.redirect('/');
        }); 
    },

    changeInfo:function(req, res){
        var queueId = req.query.queueId;
        var queueName = req.query.queueName;
        var queueCapacity = req.query.queueCapacity; 
        var queueStatus = req.query.queueStatus;
        Queue.updateOne({id: queueId},{name:queueName, status: queueStatus, capacity:queueCapacity}).exec(function(err){
            if(err){
                console.log("error: " + "  " + err);
                res.status(500).send( {error: 'Database Error'});
            }
            else{
                console.log("Change Status thanh cong");
            }
     //       res.redirect('/');
        }); 
    },
};

