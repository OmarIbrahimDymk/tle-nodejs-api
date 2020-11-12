module.exports = app => {
    const executions = require('../controller/execution.controller.js')

    app.get('/api/execution', executions.findAll)
    app.get('/api/executionNotes', executions.getTCExecutionNote)
    app.get('/api/stepExecutionNotes', executions.getTCStepExecutionNote)
    app.get('/api/getGhostString', executions.getGhostString)
}