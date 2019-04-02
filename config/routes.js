/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  //Quang Trường 3/12/2018 add
  'GET  /queuerequest/queuedemo1': { controller: 'QueuerequestController', action: 'list' },
  'GET /queuerequest/queuedemo1/addrequest': { controller: 'QueuerequestController', action: 'add'},
  'POST  /queuerequest/:branch_id/:id/create': { controller: 'QueuerequestController', action: 'create' },
  //Quang Trường 3/12/2018 end add
  //Quang Truong 7/12/2018 add
  'POST  /queuerequest/deleterequest?requestId=:requestId': { controller: 'QueuerequestController', action: 'deleteRequest' },
  //Quang Truong 7/12/2018 end add

  //Quang Truong 8/12/2018 add
  'GET  /': { controller: 'BranchController', action: 'getBranchList' },
  //Quang Truong 8/12/2018 end add

  //Quang Truong 8/12/2018 add
  'GET  /branch/:id': { controller: 'QueueController', action: 'getQueueList' }, //Show list queue trong branch
  'GET  /branch/:branch_id/:id': { controller: 'QueuerequestController', action: 'getQueueRequestList' },
  'GET  /branch/:branchid/:id/create': { controller: 'QueuerequestController', action: 'register' },
  'GET  /branch/json': { controller: 'BranchController', action: 'getBranchListJSON' },
  'GET  /branch/:id/json': { controller: 'QueueController', action: 'getQueueListJSON' },
  'GET  /branch/:branch_id/:id/json': { controller: 'QueuerequestController', action: 'getQueueRequestListJSON' },
  //Quang Truong 8/12/2018 end add
  //Quang Truong 16/2/2019 add0
  'POST  /queue/create': { controller: 'QueueController', action: 'create' },
  'POST  /queue/create?queueName=:queueName&queueBranchId=:queueBranchId&queueCapacity=:queueCapacity': { controller: 'QueueController', action: 'create' },
  'PUT  /queue/changestatus?queueId=:queueId&queueStatus=:queueStatus': { controller: 'QueueController', action: 'changeStatus' },
  'PUT  /queue/changeinfo?queueId=:queueId&queueName=:queueName&queueStatus=:queueStatus&queueCapacity=:queueCapacity': { controller: 'QueueController', action: 'changeInfo' },
  'POST  /branch/create?branchName=:branchName&branchAddress=:branchAddress&branchPhone=:branchPhone&branchCapacity=:branchCapacity&branchOpenTime=:branchOpenTime&branchCloseTime=:branchCloseTime&branchStatus=:branchStatus': { controller: 'BranchController', action: 'create' },
  'PUT  /branch/changeinfo?branchId=:branchId&branchName=:branchName&branchAddress=:branchAddress&branchPhone=:branchPhone&branchCapacity=:branchCapacity&branchOpenTime=:branchOpenTime&branchCloseTime=:branchCloseTime&branchStatus=:branchStatus': { controller: 'BranchController', action: 'changeInfo' },
  //Quang Truong 16/2/2019 end add
  //Quang Truong 23/2/2019 add
  'GET  /branch/search/:branchKeyword': { controller: 'BranchController', action: 'searchBranch' },
  //Quang Truong 23/2/2019 end add


  //Quang Truong 5/3/2019 test
  'POST  /login': { controller: 'AccountController', action: 'login' },
  'GET  /gettest': { controller: 'AccountController', action: 'testusername' },
  '/logout': 'AccountController.logout',
  'GET /register': { view: 'register' },
  'POST /account/register': {controller: 'AccountController', action: 'register'},
  'PUT /account/changeInfo': {controller: 'AccountController', action: 'changeInfo'},
  'PUT /account/changePassword': {controller: 'AccountController', action: 'changePassword'},

  //Quang Truong 5/3/2019 end test

  //Quang Truong 9/3/2019 add (admin)
  'GET /admin/login': { view: 'AdminView/AdminLogin' },
  'POST  /admin/login': { controller: 'AdminController', action: 'login' },
  'POST  /admin/logout': { controller: 'AdminController', action: 'logout' },
  'GET /admin/home': { view: 'AdminView/AdminHome' },
  'GET /admin/employee': { view: 'pages/adminemployee' },
  'GET /admin/employee/create': { controller: 'AdminController', action: 'createEmpAccountView'},
  'POST /admin/employee/create': { controller: 'AdminController', action: 'createEmpAccount'},
  'GET /admin/employee/changeinfo': { controller: 'AdminController', action: 'changeInfoEmpView'},
  'POST /admin/employee/changeinfo': { controller: 'AdminController', action: 'changeInfoEmp'},
  'GET /admin/employee/fullinfo': { controller: 'AdminController', action: 'fullInfoEmployee'},
  'GET /admin/employee': {controller: 'AdminController', action: 'allEmpView'},
  'GET /admin/employee/search': {controller: 'AdminController', action: 'searchEmpAcc'},
  'GET /admin/account/changepassword': {view: 'AdminView/AdminChangePass'},
  'POST /admin/account/changepassword': {controller: 'AdminController', action: 'changePassword'},
  'GET /admin/account/info': {controller: 'AdminController', action: 'adminInfo'},
  'GET /admin/system/data': { controller: 'AdminController', action: 'dataView'},
  'GET /admin/system/employee/test': { controller: 'AdminController', action: 'testPagination'},
  'POST /admin/system/employee/active': { controller: 'AdminController', action: 'activeAccount'},
  'POST /admin/system/employee/deactive': { controller: 'AdminController', action: 'deactiveAccount'},
  //Quang Truong 9/3/2019 end add (admin)
  'GET /employee/test': { view: 'AdminView/AdminLogin'},
  'GET /employee/abc': { controller: 'EmployeeController', action: 'test'},
  'GET /employee/xyz': { controller: 'EmployeeController', action: 'test'},

  //Quang Truong 9/3/2019 add

  'POST  /employee/login': { controller: 'EmployeeController', action: 'login' },

};
