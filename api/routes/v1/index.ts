const ping = require("./ping");
const order = require("./order");
const event = require("./event");

module.exports = (app: any) => {
  ping(app);
  order(app);
  event(app);
};
