module.exports = app => {
    const executions = require('../controller/execution.controller.js')

    app.get('/execution', executions.findAll)
    app.get('/allExecution', executions.getTCExecutionNote)
}