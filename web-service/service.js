
const Hapi = require('hapi');
const userService = require("../service/user-service.js").userService;


// 1) create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 7000 
});


// Default WS port = 80
// PATH = http://localhost:7000/user?idnumber=7606075213089

// Add the route
server.route({
    method: 'GET',
    path:'/user', 
    //handler: endpointHandlers.getUser
    handler: function (request, reply) {
        return reply(userService.fetchUser(''));
    }
});




// start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});