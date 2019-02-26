const pingController = require("../../controllers/ping");

module.exports = (app: any) => {
  app.get("/v1/ping", pingController.pong);
};
