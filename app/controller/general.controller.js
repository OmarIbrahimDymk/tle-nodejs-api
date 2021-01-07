const General = require("../models/general.model");
const general = new General();

exports.findAll = (req, res) => {
  general.getAllTestPlans((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving test plans.",
      });
      return;
    }

    res.send(data);
  });
};
