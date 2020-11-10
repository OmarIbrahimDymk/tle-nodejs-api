const Execution = require("../models/executions.model")
const execution = new Execution()

exports.findAll = (req, res) => {
    execution.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving executions."
            })
            return
        }

        res.send(data)
    })
}

exports.getTCExecutionNote = (req, res) => {
    execution.getTCExecutionNote((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving execution note"
            })
            return
        }

        res.send(data)
    })
}