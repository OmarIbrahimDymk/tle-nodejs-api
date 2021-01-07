const sql = require("./db");

const tcExecutionNote = (testPlanId) => {
  return `
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
  INNER JOIN users ON tester_id = users.id
  INNER JOIN tcversions ON executions.tcversion_id = tcversions.id
  INNER JOIN nodes_hierarchy ON tcversions.id = nodes_hierarchy.id
  INNER JOIN nodes_hierarchy AS parent1 ON nodes_hierarchy.parent_id = parent1.id
  INNER JOIN nodes_hierarchy AS parent2 ON parent1.parent_id = parent2.id
  INNER JOIN testplans ON executions.testplan_id = testplans.id
WHERE
  executions.notes IS NOT NULL
  AND executions.notes <> ''
  AND executions.testplan_id in (${testPlanId ? testPlanId : ""});
`;
};

const tcStepExecutionNote = (testPlanId) => {
  return `
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
        AND executions.testplan_id in (${testPlanId ? testPlanId : ""});
`;
};

class Executions {
  getAll(result) {
    sql.query("SELECT * FROM executions LIMIT 10", (err, res) => {
      if (err) {
        console.error(err);
        result(null, err);
        return;
      }

      result(null, res);
    });
  }

  getTCExecutionNote(params, result) {
    sql.query(tcExecutionNote(params), (err, res) => {
      if (err) {
        console.error(err);
        result(null, err);
        return;
      }

      result(null, res);
    });
  }

  getTCStepExecutionNote(params, result) {
    sql.query(tcStepExecutionNote(params), (err, res) => {
      if (err) {
        console.error(err);
        result(null, err);
        return;
      }

      result(null, res);
    });
  }

  getGhostString(params, result) {
    let ghostString = `
        select
            tcv.id,
            tcv.tc_external_id,
            tc.id as 'tc step',
            steps.step_number,
            steps.actions as 'action',
            steps.expected_results as 'expected result'
        from
            tcversions as tcv
            inner join nodes_hierarchy as tc on tc.parent_id = tcv.id
            inner join tcsteps as steps on steps.id = tc.id
        where
            tcv.tc_external_id = ${params.tc}
            and steps.step_number = ${params.step}
        limit
            1
        `;

    sql.query(ghostString, (err, res) => {
      if (err) {
        console.error(err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Executions;
