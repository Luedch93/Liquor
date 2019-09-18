const arg = require('arg');
const inquirer = require('inquirer')
import { createProject } from "./main";

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--dbUrl': Boolean,
            '-url': '--dbUrl',
        },
        {
            argv: rawArgs.splice(2),
        }
    );
    return {
        completeDbURL: args['--dbUrl'] || false,
        template: args._[0],
    };
}

async function promptForMissingArgs(options) {
    const defaultConnection = 'mongodb://localhost:27017/'
    const defaultTemplate = 'Javascript'
    const questions = []
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose wich project template to use',
            choices: ['Javascript', 'Typescript'],
            default: defaultTemplate
        })
    }

    if (options.completeDbURL) {
        questions.push({
            type: 'input',
            name: 'connString',
            message: 'Please type the connection string of your mongoDB',
            default: defaultConnection
        })
    } else {
        questions.push({
            type: 'input',
            name: 'databaseName',
            message: 'Please type the name of your database',
            default: 'LiquorDB'
        })
    }
    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        template: options.template || answers.template,
        connectionString: answers.connString || defaultConnection + answers.databaseName
    }
}

module.exports = {
    async cli(args) {
        let options = parseArgs(args);
        options = await promptForMissingArgs(options);
        console.log(options);
        await createProject(options);
    }
}