const http = require("http");
const Emitter = require("events");
const chalk = require("chalk");
const config = require("config");
const PORT = config.get("PORT");
const HOSTNAME = config.get("HOSTNAME");

const emitter = new Emitter();

const configureServer = () => {
    const emittingMask = (path, method) => `${path}::${method}`;
    const middlewares = [];

    const subscribe = middleware => middlewares.push(middleware);
    const configureEndpoints = (endpoints) => {
        if (!Object.keys(endpoints).length) throw new Error("No endpoints identified!");

        for (const path in endpoints) {
            for (const method in endpoints[path]) {
                const handler = endpoints[path][method];
                emitter.on(emittingMask(path, method), (req, res) => {
                    for (const middleware of middlewares) middleware(req, res);
                    handler(req, res);
                });
            }
        }
    }

    const getServer = () => {
        const server = http.createServer((req, res) => {
            for (const middleware of middlewares) middleware(req, res);
            const isEmitted = emitter.emit(emittingMask(req.path, req.method), req, res);
            if (!isEmitted) {
                res.writeHead(400, "Bad Request", { "Content-Type": "text/html" });
                res.end("<h1>Sorry, this path doesn't exist</h1><h1>Please try another one</h1>")
            }
        }).listen(PORT, HOSTNAME, () => {
            console.log(chalk.greenBright(`Server hast started listening on port ${PORT} at hostname ${HOSTNAME}. Server address details are: ${JSON.stringify(server.address())}`));
        })

        return server;
    }

    const newServer = getServer();

    return {
        newServer,
        subscribe,
        configureEndpoints
    };
};

module.exports = {
    configureServer
};
