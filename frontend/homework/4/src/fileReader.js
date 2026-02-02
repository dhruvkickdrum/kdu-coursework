import { readFileSync } from 'node:fs';

export function readEmployeeData(filePath) {
    try {
        // Read file
        const fileContent = readFileSync(filePath, 'utf-8');
        const employees = JSON.parse(fileContent);

        // Validate that is employee data is array or not
        if(!Array.isArray(employees)) {
            throw new TypeError('Employee data must be an array');
        }

        console.log("Successfully read employee data");
        return employees;
    } catch (error) {
        console.log("error" , error);
        throw error;
    }
}
