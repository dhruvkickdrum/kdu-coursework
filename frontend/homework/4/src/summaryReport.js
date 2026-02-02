import { writeReport } from './reportGenerator.js';


export function generateSummaryReport(employees, outputPath) {
    const totalEmployees = employees.length;
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const averageSalary = totalSalary / totalEmployees;

    const departmentData = {};

    employees.forEach(emp => {
        if(!departmentData[emp.department]) {
            departmentData[emp.department] = {
                count: 0,
                totalSalary: 0
            };
        }
        departmentData[emp.department].count++;
        departmentData[emp.department].totalSalary += emp.salary;
    });

    let report = 'EMPLOYEE SUMMARY REPORT\n\n';
    report += `Total number of employees: ${totalEmployees}\n`;
    report += `Total company salary: $${totalSalary.toLocaleString()}\n`;
    report += `Average salary: $${averageSalary.toLocaleString()}\n\n`;
    report += 'Department wise breakdown : ';

    const sortedDepartments = Object.keys(departmentData).sort((a, b) => a.localeCompare(b));

    sortedDepartments.forEach(dept => {
        const data = departmentData[dept];
        const avgSalary = data.totalSalary/ data.count;

        report += `\n Department : ${dept}\n`;
        report += `  Number of Employees: ${data.count}\n`;
        report += `  Total Salary: $${data.totalSalary.toLocaleString()}\n`;
        report += `  Average Salary: $${avgSalary.toLocaleString()}\n`;
    });

    report += `\nReport Generated: ${new Date().toLocaleString()}\n`;

    writeReport(outputPath, report);

    return report;

}
  
