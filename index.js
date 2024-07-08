#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let TodoList = [];
let conditions = true;
console.log(chalk.blueBright.bold("\n\tWelcome to Javeria's To-do List Application!\n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: (chalk.magenta("Select an option:")),
                choices: ["Add Task", "Delete Task", "Update Task", "View To-do List", "Exit"],
            }
        ]);
        if (option.choices === "Add Task") {
            await AddTask();
        }
        else if (option.choices === "Delete Task") {
            await deleteTask();
        }
        else if (option.choices === "Update Task") {
            await updateTask();
        }
        else if (option.choices === "View To-do List") {
            await viewTask();
        }
        else if (option.choices === "Exit") {
            conditions = false;
        }
    }
};
// function to add task in to-do list
let AddTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: (chalk.blue("Enter Your New Task:")),
        }
    ]);
    TodoList.push(newTask.task);
    console.log(chalk.green(`\nTask "${newTask.task}" is added to your To-do List!\n`));
};
// function to view all To-do list
let viewTask = async () => {
    console.log(chalk.magenta("\n Your To-do List: \n"));
    TodoList.forEach((task, index) => {
        console.log(`${index + 1} : ${task}`);
    });
};
// function to delete a tast from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: (chalk.blue("Enter the index of the Task you want to Delete:")),
        }
    ]);
    let deletedTask = TodoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.green(`\n Task "${deletedTask}" has been Deleted!\n`));
};
// function to update task
let updateTask = async () => {
    await viewTask();
    let updateTask_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: (chalk.blue("Enter 'index no.' of the task you want to Update:")),
        },
        {
            name: "newTask",
            type: "input",
            message: (chalk.blue("Enter a new Task to Update:")),
        }
    ]);
    TodoList[updateTask_index.index - 1] = updateTask_index.newTask;
    console.log(chalk.green(`\n Task at index no. "${updateTask_index.index - 1}" is Updated Successfully! [for updated list check "View To-do List" option]`));
};
main();
