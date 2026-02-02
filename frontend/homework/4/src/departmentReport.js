const { writeReport } = require('./reportGenerator.js');


function generateDepartmentReport(employees, department, outputPath) {
  const departmentEmployees = employees.filter(
    emp => emp.department.toLowerCase() === department.toLowerCase()
  );
  if (departmentEmployees.length === 0) {
    console.log(`No employees found in department: ${department}`);
    const report = `No employees found in department: ${department}\n`;
    writeReport(outputPath, report);
    return report;
  }
  
  const totalSalary = departmentEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalSalary / departmentEmployees.length;
  
  let report = `DEPARTMENT: ${department.toUpperCase()}\n\n`;
  
  report += 'DEPARTMENT OVERVIEW :- \n';
  report += `Department Name: ${department}\n`;
  report += `Number of Employees: ${departmentEmployees.length}\n`;
  report += `Total Salary: $${totalSalary.toLocaleString()}\n`;
  report += `Average Salary: $${averageSalary.toLocaleString()}\n\n`;
  
  report += 'EMPLOYEE LIST\n';
  report += `${'Name'.padEnd(25)} ${'Salary'}\n`;
  
  departmentEmployees.sort((a, b) => a.name.localeCompare(b.name));
  
  departmentEmployees.forEach(emp => {
    report += `${emp.name.padEnd(25)} $${emp.salary.toLocaleString()}\n`;
  });
  
  report += `\nReport Generated: ${new Date().toLocaleString()}\n`;
  
  writeReport(outputPath, report);
  
  return report;
}


module.exports = {
  generateDepartmentReport
};