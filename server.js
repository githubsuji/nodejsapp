'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});
server.route({
    method: 'POST',
    path: '/signup',
    handler: function (request, h) {

        const payload = request.payload;
        return `Welcome ${encodeURIComponent(payload.username)}!`;
    }
});
const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {

            return h.file('./public/hello.html');
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();