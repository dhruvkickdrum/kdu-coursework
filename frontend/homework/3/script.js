
// Task 1.1: Create Task Constructor that accept title and priority and generate the id automatically and set completed to false default.
function Task(title, priority) {
    this.id = Date.now();
    this.title = title;
    this.priority = priority;
    this.completed = false;
}

// Get Info Method in Task prototype
Task.prototype.getInfo = function () {
    return `Task[${this.id}]: ${this.title} | Priority: ${this.priority} | Completed: ${this.completed}`;
}

// Task 1.2: Add Methods to Task.prototype

// Function for validating the priority
Task.prototype.isValidatePriority = function(priority) {
    return ["Low", "Medium", "High"].includes(priority);
}

// Mark complete function -> set the completed to true
Task.prototype.markComplete = function() {
    this.completed = true;
    return this; // Return the task instance
}

// Update priority method -> it validates the newPriority and set the new Priority
Task.prototype.updatePriority = function(newPriority) {
    if(!this.isValidatePriority(newPriority)) {
        throw new Error("Invalid Priority! Use Low, Medium or High");
    }
    this.priority = newPriority;
    return this;
}


// Task 1.3 -> Create Priority Task Constructor
function PriorityTask(title, priority, dueDate) {
    Task.call(this, title, priority);
    this.dueDate = dueDate || null; 
}

// Prototype chaining
PriorityTask.prototype = Object.create(Task.prototype);

// Override the getInfo method to include the dueDate if present
PriorityTask.prototype.getInfo = function() {
    let baseInfo = Task.prototype.getInfo(this);
    return this.dueDate ? `${baseInfo} | Due Date: ${this.dueDate}` : baseInfo;
}

// Task 1.4 : Add utility method to Task.prototype getAllTaskInfo()
// It accept the array of tasks, Return an array of info strings, and use the getInfo method internally in this function
Task.prototype.getAllTasksInfo = function(tasks) {
    return tasks.map(task => task.getInfo());
}


// Demonstration of part 1 : 
const task1 = new Task("Task 1", "High");
const task2 = new Task("Task 2", "Medium");
const task3 = new Task("Task 3", "Low");
const priorityTask1 = new PriorityTask("Task 4" , "High");
const priorityTask2 = new PriorityTask("Task 5" , "Medium", "2026-01-31");

console.log(task1.getInfo());
console.log(task1.getAllTasksInfo([task1, task2, task3]));

task1.updatePriority("Low");
console.log(task1.getInfo());

task1.markComplete();
console.log(task1.getInfo());

console.log(priorityTask1.getInfo());
console.log(priorityTask2.getInfo());


// Part 2 : Event Loop and async Operations

// Task 2.1 -> Create Task with delay;
// it return a promise uses settimeout with a 1 sec delay
// and resolve with a new task instance.
function createTaskAsync(title, priority) {
    console.log("Creating Tasks...");
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const task = new Task(title, priority);
                console.log("Task Completed");
                resolve(task);
            }, 1000);
        } catch(err) {
            reject(err);
        }
    });
}

const createdTask = createTaskAsync("Task 1", "High");
console.log("CreateTaskAsync Function : " ,createdTask);
setTimeout(() => {
    console.log("CreateTaskAsync Function : " , createdTask);
}, 4000);


// Task 2.2 -> Demonstrate the event loop -> Print in order 1 -> 4 -> 3 -> 2 Each element print after the 2 sec delay.
function demonstrateEventLoop() {
    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 6000);

    Promise.resolve()
    .then(() => {
        setTimeout(() => {
            console.log("3");
        }, 4000);
    });

    setTimeout(() => {
        console.log("4");
    }, 2000);
}

// It demonstate the event loop like how can we manipulate the  printing, by how we want to get using the setTimeout and Promises.
demonstrateEventLoop();

// Task 2.3 -> Create a function that 
// use async/await
// calls CreateTaskAsync first then again calls createTaskAsync to prepare another task once above is done.
// Logs that task created successfully
// return the saved task
async function createAndSaveTask(title, priority) {
    try {
        const task1 = await createTaskAsync(title, priority);
        await createTaskAsync("Secondary Task", "low");
        console.log("Task created and saved successfully!");
        return task1;
    }
    catch (error) {
        console.error("Error while creating task:", error.message);
        throw error;
    }
}


// Call the createAndSaveTask() function to create a function it return a promise
const task = createAndSaveTask("Main Task", "Medium");
// Print the returned promise from above function it print the "Promise <Pending>" because the promise currently is in Pending state
console.log("createAndSaveTask Function : " ,task);
// Again printing the promise after some delay, because till that time Promise will resolved and now it prints the returned data by function.
setTimeout(() => {
    console.log("createAndSaveTask Function : " ,task);
}, 8000);

// Task 2.4 -> Create a function that process the batch of tasks
// Accepts an array of task objects (title, priority)
// used promise.all to process all the task concurrently
// return and array of created task;

async function createMultipleTasksAsync(taskDataEntry) {
    console.log(`Creating ${taskDataEntry.length} tasks...`);

    const promises = taskDataEntry.map(task => {
        return createTaskAsync(task.title, task.priority);
    });
    const tasks = await Promise.all(promises);
    console.log("All Tasks Created");
    return tasks;   
}

// Call the createMultupleTaskAsync function to create the multiple tasks which return a promise
const taskData = createMultipleTasksAsync([task1, task2, task3]);
// Logs the promise state just after calling the function it shows "Promise <Pending>" because at this momement promise is in pending state
console.log("createMultipleTaskAsync Function : " ,taskData);
// Again printing the Promise but after some delay so till that time it Promise resolved and it prints the returned data.
setTimeout(() => {
    console.log("createMultipleTaskAsync Function : " ,taskData);
}, 12000);