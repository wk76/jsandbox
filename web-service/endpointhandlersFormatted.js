
const userService = require("../service/user-service.js").userService;

// Usage: 
// function getUser(request, reply) {  }

const endPointHandlersFormatted =
    [

        getUserPath = {
            method: 'GET',
            path: '/user/{idnumber}',
            handler: function (request, reply) {
                let id = request.params.idnumber;
                userService.fetchUser(id).then((user) => {
                    if (user) {
                        let header = '<h2>User ID: ' + user[0]["idnumber"] + '</h2>';
                        let listStart = '<ul>';
                        let listClose = '</ul>';
                        let listItems = [];
                        for (item in user[0]) {
                            listItems.push('<li><b>' + item + '</b>: ' + user[0][item] + '</li>');
                        }
                        reply(header + listStart + listItems.join(" ") + listClose);
                    } else {
                        reply('User not found');
                    }
                });
            }
        },

        getUserQuery = {
            method: 'GET',
            path: '/user',
            handler: function (request, reply) {
                let id = request.query.idnumber;
                userService.fetchUser(id).then((user) => {
                    if (user) {
                        let header = '<h2>User ID: ' + user[0]["idnumber"] + '</h2>';
                        let listStart = '<ul>';
                        let listClose = '</ul>';
                        let listItems = [];
                        for (item in user[0]) {
                            listItems.push('<li><b>' + item + '</b>: ' + user[0][item] + '</li>');
                        }
                        reply(header + listStart + listItems.join(" ") + listClose);
                    } else {
                        reply('User not found');
                    }
                });
            }
        },

        getUsersAll = {
            method: 'GET',
            path: '/users',
            handler: function (request, reply) {
                userService.fetchUsersAll().then((users) => {
                    if (users) {
                        let tableOpen = '<table style="width:100%">';
                        let tableCaption = '<caption> <h1> All Users </h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableHeader = '<tr> <th style="text-align:left"> Adivsor Name </th> <th style="text-align:left"> Branch </th> <th style="text-align:left"> Employment Date </th> <th style="text-align:left"> ID Number </th> <th style="text-align:left"> Qualification </th> <th style="text-align:left"> RE5 </th> <th style="text-align:left"> Supervisor </th> ';
                        let tableRecords = [];
                        for (user of users) {
                            let tr = '<tr> <td> ' + user.advisorName + ' </td>  <td> ' + user.branch + ' </td> <td> ' + user.employmentDate + ' </td> <td> ' + user.idnumber + ' </td> <td> ' + user.qualification + ' </td> <td> ' + user.re5 + ' </td> <td> ' + user.supervisor + '</td> </tr>'
                            tableRecords.push(tr);
                        }
                        reply(tableOpen + tableCaption + tableHeader + (tableRecords.sort()).join(" ") + tableClose);
                        //reply(users);
                    } else {
                        reply('Users not found');
                    }
                });
            }
        },

        getUsersBranch = {
            method: 'GET',
            path: '/users/{branch}',
            handler: function (request, reply) {
                let branch = request.params.branch;
                userService.fetchUsersBranch(branch).then((users) => {
                    if (users) {
                        let tableOpen = '<table style="width:100%">';
                        let tableCaption = '<caption> <h1> Users for Branch: '+ branch + '</h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableHeader = '<tr> <th style="text-align:left"> Adivsor Name </th> <th style="text-align:left"> Branch </th> <th style="text-align:left"> Employment Date </th> <th style="text-align:left"> ID Number </th> <th style="text-align:left"> Qualification </th> <th style="text-align:left"> RE5 </th> <th style="text-align:left"> Supervisor </th> ';
                        let tableRecords = [];
                        for (user of users) {
                            let tr = '<tr> <td> ' + user.advisorName + ' </td>  <td> ' + user.branch + ' </td> <td> ' + user.employmentDate + ' </td> <td> ' + user.idnumber + ' </td> <td> ' + user.qualification + ' </td> <td> ' + user.re5 + ' </td> <td> ' + user.supervisor + '</td> </tr>'
                            tableRecords.push(tr);
                        }
                        reply(tableOpen + tableCaption + tableHeader + (tableRecords.sort()).join(" ") + tableClose);
                    } else {
                        reply('Users not found');
                    }
                });
            }
        },

        numberUsersPerBranch = {
            method: 'GET',
            path: '/users/branchusercount',
            handler: function (request, reply) {
                userService.countUsersPerBranch().then((branches) => {
                    if (branches) {
                        let style = '<style>table  {border: 2px solid black; border-collapse: collapse} </style>';
                        let tableOpen = '<table>';
                        let tableCaption = '<caption> <h1> Total Users per Branch</h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableHeader = '<tr> <th style="text-align:left; width:400px"> Branch </th> <th style="text-align:right; width:100px"> Total </th>  ';
                        let tableRecords = [];
                        for (branch of branches) {
                            let tr = '<tr> <td> ' + branch.branch + ' </td>  <td style="text-align:right"> ' + branch.numUsers + ' </td> <td> ' 
                            tableRecords.push(tr);
                        }
                        reply(style + tableOpen + tableCaption + tableHeader + (tableRecords.sort()).join(" ") + tableClose);
                    } else {
                        reply('No branches found');
                    }
                });
            }
        }








    ];


exports.endPointHandlersFormatted = endPointHandlersFormatted;




//exports.getUserPath = getUserPath;
//exports.getUserQuery = getUserQuery;
//exports.getUsersAll = getUsersAll;



