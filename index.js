const http = require("http");
const config = require("config");
const chalk = require("chalk");

const PORT = config.get("PORT");
const HOSTNAME = config.get("HOSTNAME");

const server = http.createServer((req, res) => {});

server.listen(PORT, HOSTNAME, () => {
    console.log(chalk.greenBright(`Server hast started listening on port ${PORT} at hostname ${HOSTNAME}. Server address details are: ${JSON.stringify(server.address())}`));
})