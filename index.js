const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your README?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is the description for your README?',
        },
        {
            type: 'input',
            name: 'install',
            message: 'What are the installation instructions for your README?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is the usage information for your README?',
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'What are the contribution guidelines for your README?'
        },
        {
            type: 'input',
            name: 'test',
            message: 'What are the test instructions for your README?',
        },
    ]);
};

const generateREADME = (answers) =>
    `# ${answers.title}

## Description:

${answers.description}

## Installation Instructions:

${answers.install}

## Usage Information:

${answers.usage}

## Contribution Guidelines:

${answers.contribution}

## Test Instructions:

${answers.test}`

const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to README.md'))
        .catch((err) => console.error(err));
}

init();