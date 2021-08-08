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
        {
            type: 'list',
            name: 'license',
            message: 'Which license would you like to use for your README?',
            choices: ['MIT', 'Mozilla', 'GNU']
        },
    ]);
};

// const licenseBadge = '';

// generateBadge = (answers) => {
//     if (answers.license === 'MIT') {
//         const licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
//     } else if (answers.license === 'Mozilla') {
//         const licenseBadge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
//     } else {
//         const licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
//     }
// }

const generateREADME = (answers) =>
    `# ${answers.title}

${answers.license}

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
        // .then((answers) => generateBadge(answers))
        .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to README.md'))
        .catch((err) => console.error(err));
}

init();