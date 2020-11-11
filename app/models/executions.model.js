const sql = require("./db")

const tcExecutionNote = `
SELECT 
    users.first AS 'tester',
    executions.notes,
    parent1.name AS 'Test Case',
    parent2.name AS 'Test Suite',
    tcversions.tc_external_id,
    executions.execution_ts AS 'DateTime',
    testplans.notes AS 'Test Plan'
FROM
    executions
        INNER JOIN
    users ON tester_id = users.id
        INNER JOIN
    tcversions ON executions.tcversion_id = tcversions.id
        INNER JOIN
    nodes_hierarchy ON tcversions.id = nodes_hierarchy.id
        INNER JOIN
    nodes_hierarchy AS parent1 ON nodes_hierarchy.parent_id = parent1.id
        INNER JOIN
    nodes_hierarchy AS parent2 ON parent1.parent_id = parent2.id
        INNER JOIN
    testplans ON executions.testplan_id = testplans.id
WHERE
    executions.notes IS NOT NULL
        AND executions.notes <> ''
        AND (executions.testplan_id = 22141
        OR executions.testplan_id = 22140
        OR executions.testplan_id = 22139);
`

const tcStepExecutionNote = `
SELECT 
    users.first AS 'tester',
    execstep.notes AS 'execution note',
    step.step_number AS 'step no',
    testcase.tc_external_id AS 'test case eid',
    parent1.name AS 'Test Case',
    parent2.name AS 'Test Suite',
    executions.execution_ts AS 'DateTime',
    step.actions AS 'action',
    step.expected_results AS 'expected result',
    testplans.notes AS 'Test Plan'
FROM
    executions
        INNER JOIN
    execution_tcsteps AS execstep ON executions.id = execstep.execution_id
        INNER JOIN
    users ON executions.tester_id = users.id
        INNER JOIN
    tcsteps AS step ON step.id = execstep.tcstep_id
        INNER JOIN
    tcversions AS testcase ON executions.tcversion_id = testcase.id
        INNER JOIN
    nodes_hierarchy ON testcase.id = nodes_hierarchy.id
        INNER JOIN
    nodes_hierarchy AS parent1 ON nodes_hierarchy.parent_id = parent1.id
        INNER JOIN
    nodes_hierarchy AS parent2 ON parent1.parent_id = parent2.id
        INNER JOIN
    testplans ON executions.testplan_id = testplans.id
WHERE
    execstep.notes IS NOT NULL
        AND execstep.notes <> ' '
        AND (executions.testplan_id = 22141
        OR executions.testplan_id = 22140
        OR executions.testplan_id = 22139);
`

class Executions {
    getAll(result) {
        sql.query("SELECT * FROM executions LIMIT 10", (err, res) => {
            if (err) {
                console.error(err)
                result(null, err)
                return
            }

            console.log("executions", res)
            result(null, res)
        })
    }

    getTCExecutionNote(result) {
        sql.query(tcExecutionNote, (err, res) => {
            if (err) {
                console.error(err)
                result(null, err)
                return
            }

            console.log("executions", res)
            result(null, res)
        })
    }

    getTCStepExecutionNote(result) {
        sql.query(tcStepExecutionNote, (err, res) => {
            if (err) {
                console.error(err)
                result(null, err)
                return
            }

            console.log("executions", res)
            result(null, res)
        })
    }
}

module.exports = Executions;