module.exports = (app) => {
  const general = require("../controller/general.controller.js");

  app.get("/api/getTestPlans", general.findAll);
};
