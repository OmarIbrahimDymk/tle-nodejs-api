const Execution = require("../models/executions.model");
const execution = new Execution();

exports.findAll = (req, res) => {
  execution.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving executions.",
      });
      return;
    }

    res.send(data);
  });
};

exports.getTCExecutionNote = (req, res) => {
  let params = req.query.test_plan_id;
  execution.getTCExecutionNote(params, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving execution note",
      });
      return;
    }

    res.send(data);
  });
};

exports.getTCStepExecutionNote = (req, res) => {
  let params = req.query.test_plan_id;
  execution.getTCStepExecutionNote(params, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving step execution note",
      });
      return;
    }

    res.send(data);
  });
};

exports.getGhostString = (req, res) => {
  let params = {};
  params.step = req.query.step;
  params.tc = req.query.tc;
  execution.getGhostString(params, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving step execution note",
      });
      return;
    }

    res.send(data);
  });
};
