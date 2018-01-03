const uuid = require("uuid/v1");

module.exports = (_req, res) => {
    res.json({ id: uuid() });
}
