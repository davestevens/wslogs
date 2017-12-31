const socketIO = require("socket.io");
let clientCount = 0;

module.exports = (server) => {
    const io = socketIO(server);
    const logNamespace = io.of("/log");
    const viewNamespace = io.of("/view");

    logNamespace.on("connection", (socket) => {
        console.log("connection", socket.id);
        viewNamespace.emit("clientCount", ++clientCount);

        socket.on("message", (data) => {
            console.log("socket sent message", socket.id, JSON.stringify(data));
            viewNamespace.emit("message", { id: socket.id, data });
        });

        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
            viewNamespace.emit("clientCount", --clientCount);
        });
    });

    viewNamespace.on("connection", (socket) => {
        console.log("view connection", socket.id);
        socket.emit("clientCount", clientCount);

        // TODO: control flow of data (pause/resume)?
        // TODO: fetch filtered/paginated data?

        socket.on("disconnect", () => {
            console.log("view socket disconnected", socket.id);
        });
    });  
};
