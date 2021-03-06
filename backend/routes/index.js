var fs = require('fs')
var Path = require('path')
var routes = {}

routes.register = function(server) {
    fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && file.indexOf('spec') < 0
    })
    .forEach(function(file) {
        var routes = require(Path.join(__dirname, file))
        routes.forEach(route => {
            server.route(route)
        })
    })

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false,
            handler: function(request, reply) {
                reply.file(Path.join(__dirname, '..', '..', 'frontend', 'index.html'))
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/build/{param*}',
        config: {
            auth: false,
            handler: {
                directory: {
                    path: Path.join(__dirname, '..', '..', 'build'),
                    index: true
                }
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/assets/{param*}',
        config: {
            auth: false,
            handler: {
                directory: {
                    path: Path.join(__dirname, '..', '..', 'frontend', 'assets'),
                    index: true
                }
            }
        }
    })
}

module.exports = routes
