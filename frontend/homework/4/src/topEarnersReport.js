const { writeReport } = require('./reportGenerator.js');


function generateTopEarnersReport(employees, count, outputPath) {
  const sortedEmployees = [...employees].sort((a, b) => b.salary - a.salary);
  
  const topEarners = sortedEmployees.slice(0, count);
  
  let report = `TOP ${count} EARNERS REPORT\n`;
  report += `${'Rank'.padEnd(6)} ${'Name'.padEnd(20)} ${'Department'.padEnd(20)} ${'Salary'}\n`;
  
  topEarners.forEach((emp, index) => {
    const rank = (index + 1).toString();
    report += `${rank.padEnd(6)} ${emp.name.padEnd(20)} ${emp.department.padEnd(20)} $${emp.salary.toLocaleString()}\n`;
  });
  
  report += `Report Generated: ${new Date().toLocaleString()}\n`;

  writeReport(outputPath, report);
  
  return report;
}

module.exports = {
  generateTopEarnersReport
};