const http = require("http");
const app = require("./app");
const frontend = require("./frontend");

module.exports = (PORT = 9000) => {
    const server = http.createServer(app);
    const websockets = require("./websockets");
    websockets(server);
    frontend(app);

    server.listen(PORT, () => {
        console.log(`Server listening on port ${ server.address().port }!`);
    });
}
