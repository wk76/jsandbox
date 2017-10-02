
const userService = require("../service/user-service.js").userService;

// Usage: 
// function getUser(request, reply) {  }

const endPointHandlers =
    [

        getUserPath = {
            method: 'GET',
            path: '/user/{idnumber}',
            handler: function (request, reply) {
                let id = request.params.idnumber;
                userService.fetchUser(id).then((user) => {
                    if (user) {
                        reply(user);
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
                        reply(user);
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
                        reply(users);
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
                        reply(users);
                    } else {
                        reply('Users not found');
                    }
                });
            }
        },

        createOrUpdateUser = {
            method: 'POST',
            path: '/users',
            handler: function (request, reply) {
                console.log(request.payload);
                //userService.updateUser(request.payload);
                reply('Ons het hom');
            }
        },


    ];


exports.endPointHandlers = endPointHandlers;




//exports.getUserPath = getUserPath;
//exports.getUserQuery = getUserQuery;
//exports.getUsersAll = getUsersAll;



