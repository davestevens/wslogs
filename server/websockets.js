const socketIO = require("socket.io");

module.exports = (server) => {
    const io = socketIO(server);
    const viewNamespace = io.of("/view");

    io.on("connection", (socket) => {
        console.log("connection", socket.id);

        socket.on("message", (data) => {
            console.log("socket sent message", socket.id, JSON.stringify(data));
            viewNamespace.emit("message", { id: socket.id, data });
        });

        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
        });
    });

    viewNamespace.on("connection", (socket) => {
        console.log("view connection", socket.id);

        socket.on("identifyClients", () => {
            io.emit("identify");
        });

        // TODO: control flow of data (pause/resume)?
        // TODO: fetch filtered/paginated data?

        socket.on("disconnect", () => {
            console.log("view socket disconnected", socket.id);
        });
    });  
};
