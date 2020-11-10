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
}

module.exports = Executions;