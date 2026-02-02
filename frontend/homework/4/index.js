import path from 'node:path';
import { readEmployeeData } from './src/fileReader.js';
import { generateSummaryReport } from './src/summaryReport.js';
import { generateDepartmentReport } from './src/departmentReport.js';
import { generateTopEarnersReport } from './src/topEarnersReport.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data', 'employees.json');
const REPORTS_DIR = path.join(__dirname, 'reports');

function main() {
    try {
        const employees = readEmployeeData(DATA_FILE);

        // get commands line argument
        const args = process.argv.slice(2);
        const command = args[0] ? args[0].toLowerCase() : 'all';

        console.log("Command : " , command);

        switch(command) {
            case 'summary' : 
                generateSummary(employees);
                break;
            case 'department' : 
                generateDepartment(employees, args);
                break;
            case 'top': 
                generateTopEarners(employees, args);
                break;
            case 'all' : 
                generateAll(employees);
                break;
            default : 
                console.log("unknown command: ",command);
                process.exit(1);
        }

        console.log("Processing Complete");
        process.exit(0);
    }
    catch(error) {
        console.log("Error : Processing Failed -> ", error.message);
        process.exit(1);
    }
}

function generateSummary (employees) {
    const outputPath = path.join(REPORTS_DIR, "summary_report.txt");
    generateSummaryReport(employees, outputPath);
}

function generateDepartment (employees, args) {
    const departments = [...new Set(employees.map(emp =>emp.departments))];
    // if specific department provided
    if(args[1]) {
        const dept = args[1];
        const outputPath = path.join(REPORTS_DIR, `department_${dept.toLowerCase()}_report.txt`);
        generateDepartmentReport(employees, dept, outputPath);
    } 
    // Otherwise generate report for all the departments
    else {
        console.log("Generating repor for all the departments\n");
        departments.forEach(dept => {
            const outputPath = path.join(REPORTS_DIR, `department_${dept.toLowerCase()}_report.txt`);
            generateDepartmentReport(employees, dept, outputPath);
        });
    }
}

function generateTopEarners (employees, args) {
    let count = args[1] ? Number.parseInt(args[1]) : 5;

    if(Number.isNaN(count) || count < 1) {
        console.error("Invalid count provided. Using default : 5");
        count = 5;
    }

    const outputPath = path.join(REPORTS_DIR, `top_${count}_earners_report.txt`);
    generateTopEarnersReport(employees, count, outputPath)
}


function generateAll(employees) {
  console.log('Generating all reports...\n');
  
  // Summary report
  generateSummary(employees);
  
  // Department reports
  const departments = [...new Set(employees.map(emp => emp.department))];
  departments.forEach(dept => {
    const outputPath = path.join(REPORTS_DIR, `department_${dept.toLowerCase()}_report.txt`);
    generateDepartmentReport(employees, dept, outputPath);
  });
  
  // Top earners report
  const outputPath = path.join(REPORTS_DIR, 'top_5_earners_report.txt');
  generateTopEarnersReport(employees, 5, outputPath);
}


main();