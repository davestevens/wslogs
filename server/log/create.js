const logEvents = require("../logevents");

module.exports = (req, res) => {
    logEvents.emit("message", { id: req.headers["x-client-id"], data: req.body });
    res.sendStatus(200);
}
