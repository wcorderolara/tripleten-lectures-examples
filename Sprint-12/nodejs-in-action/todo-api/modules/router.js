const logger = require('../utils/logger');

class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
        };
    }

    //regiter a GET route
    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    put(path, handler) {
        this.routes.PUT[path] = handler;
    }

    delete(path, handler) {
        this.routes.DELETE[path] = handler;
    }

    /* /todos --> GET */

    async handle(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname;
        const method = req.method;

        req.pathname = path;
        // localhost:4000/todos?completed=true&title=homework
        /*
            {
                completed: "true",
                title: "homework"
            }
        */
        req.query = Object.fromEntries(url.searchParams.entries());

        const methodRoutes = this.routes[method] || {};

        if(methodRoutes[path]) {
            return await methodRoutes[path](req, res);
        }

        //Try to find a route with path parameters
        // /todos/50
        for(const routePath in methodRoutes) {
            const params = this.matchRoute(routePath, path);
            if(params) {
                req.params = params;
                return await methodRoutes[routePath](req, res);
            }
        }

        this.sendNotFound(res);
    }

    matchRoute(routePath, actualPath) {
        const routeParts = routePath.split('/');
        const parthParts = actualPath.split('/');

        if(routeParts.length !== parthParts.length) {
            return null;
        }

        const params = {};

        for(let i = 0; i < routeParts.length; i++) {
            if(routeParts[i].startsWith(':')) {
                const paramName = routeParts[i].slice(1);
                params[paramName] = parthParts[i];
            } else if(routeParts[i] !== parthParts[i]) {
                return null;
            }
        }

        return params;
    }

    sendNotFound(res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Route Not Found', success: false}))
    }

}

module.exports = Router;
