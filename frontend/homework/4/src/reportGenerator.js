const { existsSync, mkdirSync, writeFileSync } = require('node:fs');
const { dirname } = require('node:path');



function writeReport(filePath, content) {
    try {
        const directory = dirname(filePath);
        if(!existsSync(directory)) {
            mkdirSync(directory, {recursive: true});
            console.log(`Created directory: ${directory}`);
        }
        writeFileSync(filePath, content, 'utf-8');
        console.log(`Report successfully written to: ${filePath}`);
    } catch (error) {
        console.log(`Error writing report to ${filePath}: ${error.message}`);
        throw error;
    }
}


module.exports = {
    writeReport
}