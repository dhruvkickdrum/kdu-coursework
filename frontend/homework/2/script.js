// Employee Class for creating the objects of employee
class Employee {
    constructor(id, name, age, salary, department, skills, experience) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.department = department;
        this.skills = skills;
        this.experience = experience;
    }

    // Task 1.3 ->  Return the complete detail of the employee.
    getFullInfo() {
        return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}, Department: ${this.department}, Skills: ${this.skills}, Experience: ${this.experience} years`;    
    }
}

// Tasl 1.1 -> Create Employee Objects
const employee1 = new Employee(1, 'Dhruv', 22, 35000, "Software Engineering", ["Javascript", "HTML", "CSS", "SASS", "Sprinboot"], 1);
const employee2 = new Employee(2, 'Deepak', 23, 35000, "Software Engineering", ["Javascript", "HTML", "CSS"], 2);
const employee3 = new Employee(3, 'Himanshu', 22, 30000, "Software Engineering", ["Javascript", "HTML", "CSS", "Java", "Springboot"], 2);
const employee4 = new Employee(4, "Rohit", 23, 20000, "Engineering",["Javascript", "HTML", "CSS", "Java", "Springboot"], 1);
const employee5 = new Employee(5, "Jatin", 21, 200000, "Engineering",["Javascript", "HTML", "CSS", "Java"], 1);


// Task 1.2 -> Return the employee detail in formated String
function getEmployeeInfo(employee) {
    console.log(`${employee.name} works in ${employee.department} and earns ₹${employee.salary}`);
}

// Task 1.2 -> Add skills to particular employee skills array;
function addSkill(employee, skill) {
    employee.skills.push(skill);
}

// Task 1.3 -> Compare employees based on skills set
function compareEmployess(emp1, emp2) {
    if (emp1.skills.length > emp2.skills.length) {
        console.log(`${emp1.name} has more skills than ${emp2.name}`);
    } else {
        console.log(`${emp2.name} has more skills than ${emp1.name}`);
    }
}

console.log("Employee 1 Detail: ");
getEmployeeInfo(employee1);
console.log("Employee 1 full details before adding extra skill : ");
console.log(employee1.getFullInfo());
addSkill(employee1, "Python");
console.log("Employee 1 full details after adding extra skill : ")
console.log(employee1.getFullInfo());

console.log("Comparing employee1 and employee 2 : ");
compareEmployess(employee1, employee2);

// Task 2.1 -> Create the employee array containg all 4 employees 
const empArray = [employee1, employee2, employee3, employee4, employee5];
console.log("Employee Array : ");
console.log(empArray);


// Task 2.2 -> Used filter to filter the employees by experience
function filteredByExperience(employees, minExperience) {
    return employees.filter(employees => employees.experience >= minExperience);
}

console.log("Employee Array after filtered by experince of 2 years : ");
console.log(filteredByExperience(empArray, 2));

// Task 2.3 -> return map to return the summaries of hthe employees;
function summaries(employees) {
    employees.map(employee => console.log(`${employee.name} (${employee.department}) - ${employee.salary}`));
}

console.log("Employee Summary : ");
summaries(empArray);


// Task 2.4 -> Used reduced method to get avg salary of the employees
function avgSalary(employees) {
    const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
    return totalSalary / employees.length;
}

console.log("Average Salary : ");
console.log(avgSalary(empArray));


// Task 2.4 -> Used reduce method to get department wise employee count
function departmentWiseEmployeeCount(employees) {
    const departmentCount = employees.reduce((count, employee) => {
        if (!count[employee.department]) {
            count[employee.department] = 0;
        }
        count[employee.department]++;
        return count;
    }, {});
    return departmentCount;
}

console.log("Department Wise Employee Count : ");
console.log(departmentWiseEmployeeCount(empArray));


// Task 2.5 -> Sort the employee to get the highest paid employee
function findHighestPaid(employees) {
    return employees.sort((a, b) => b.salary - a.salary)[0];
}

console.log("Highest Paid Employee : ");
console.log(findHighestPaid(empArray));

// Task 2.5 -> Sort employees by experience using sort function
function sortByExperience(employees) {
    return employees.sort((a, b) => b.experience - a.experience);
}

console.log("Sorted by Experience : ");
console.log(sortByExperience(empArray));


// Task 3.1 -> Destructing the Object to get name department and the salary of the employee
function destructingObject(employee) {
    const { name,department, salary } = employee;
    return { name, salary, department };
}

console.log("Destructing Object Employee 1 to get name, department, salary: ");
console.log(destructingObject(employee1));


// Task 3.2 -> Destructing the array to get top paid and bottom paid employee
function destructingArray(employees) {
    employees.sort((a, b) => b.salary - a.salary);
    const topPaid = employees[0];
    const bottomPaid = employees[employees.length - 1];
    
    return [topPaid, bottomPaid];
}

console.log("Destructing Array to get highest paid and bottom paid employee : ");
console.log(destructingArray(empArray));


// Task 3.3 -> Merge skills of two employees using spread operator
function mergeSkills(employee1, employee2) {
    const mergedSkills = [...new Set([...employee1.skills, ...employee2.skills])];
    return mergedSkills;
}

console.log("Merge the skills of employee1 and employee2 : ");
console.log(mergeSkills(employee1, employee2));


// Task 3.4 -> Using rest operator count of total employees
function totalEmployees(...employees) {
    return employees.length;
}

// Task 3.4 -> Using rest operator return the avg age of employees 
function avgAge(...employees) {
    const totalAge = employees.reduce((total, employee) => total + employee.age, 0);
    return totalAge/ employees.length;
}

console.log("Total Employees ( depend on how many parameters we pass in function ) : ");
console.log(totalEmployees(employee1, employee2, employee3, employee4));
console.log("Average Age of employees : ");
console.log(avgAge(employee1, employee2, employee3, employee4));


// Task 4.1 -> Return the skill frequency map
function getAnalytics(employees) {
    const skillsCount = employees.reduce((count, employee) => {
        employee.skills.forEach(skill => {
            if (!count[skill]) {
                count[skill] = 0;
            }
            count[skill]++;
        });
        return count;
    }, {});
    return skillsCount;
}

console.log("Get Analytics of skills count: ");
console.log(getAnalytics(empArray));