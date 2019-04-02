/**
 * QueuerequestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getQueueRequestList: function (req, res) {
        var queueId = req.param('id');
        var branchId = req.param('branch_id');
        Queuerequest.find({ queue_id: queueId }).exec(function (err, queuerequest) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view('QueueRequestView/QueueRequestList', { queuerequest: queuerequest, branchID: branchId, queueID: queueId });
        });
    },

    getQueueRequestListJSON: function (req, res) {
        var queueId = req.params.id;
        Queuerequest.find({ queue_id: queueId }).exec(function (err, queuerequest) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.json(queuerequest);
        });
    },

    register: function (req, res) {
        var queueId = req.param('id');
        var branchId = req.param('branchid');
        res.view('QueueRequestView/QueueRequestRegister',{branchID:branchId, queueID:queueId});
    },
    create: function (req, res) {
        var customername = req.param('customername');
        var customerphone = req.param('customerphone');
        var customeremail = req.param('customeremail');
        var queueId=req.param('id');
        var branchId=req.param('branchid');
        console.log("create queuerequest");
        console.log(queueId + " " + branchId);

        Queuerequest.create({ customerName: customername, customerPhone: customerphone, customerEmail: customeremail, queue_id: queueId, branch_id:branchId }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('/');
        });
    },

    deleteRequest: function (req, res) {
        var requestId = req.query.requestId
        console.log("Delete Queuerequest " + requestId);
        Queuerequest.destroy({ id: requestId }).exec(function (err) { //doubt
            if (err) {
                res.send(500, { error: 'Database Error' });
            }

            res.redirect('/');
        });

        return false;
    },

    getCheckInOutTime: function (req, res) {
        var queueRequestId = req.query.queueRequestId;
        var queueRequestConfirmType = req.query.queueRequestConfirmType;
        var queueRequestTime = req.query.queueRequestTime;
        if (queueRequestConfirmType == 0) { //check in
            Queuerequest.updateOne({ id: queueRequestId }, { startTime: queueRequestTime }).exec(function (err) {
                if (err) {
                    console.log("error: " + "  " + err);
                    res.status(500).send({ error: 'Database Error' });
                }
                else {
                    console.log("Ghi nhan Check In thanh cong");
                }
                //       res.redirect('/');
            });

        } else {
            Queuerequest.updateOne({ id: queueRequestId }, { endTime: queueRequestTime }).exec(function (err) {
                if (err) {
                    console.log("error: " + "  " + err);
                    res.status(500).send({ error: 'Database Error' });
                }
                else {
                    console.log("Ghi nhan checkout thanh cong");
                }
                //       res.redirect('/');
            });
        }
    },

};

