const sql = require("./db");

const testplan = `
select
  testplans.id as 'test_plan_id',
  testplans.testproject_id as 'test_project_id',
  nodes_hierarchy.name as 'test_plan_name'
from
  testplans
  inner join nodes_hierarchy on testplans.id = nodes_hierarchy.id
`;

class Executions {
  getAllTestPlans(result) {
    sql.query(testplan, (err, res) => {
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
