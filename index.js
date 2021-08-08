
//allows necessary modules to be imported
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);


//uses inquirer prompt to get information from the user that will be used to create the README
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
        {
            type: 'input',
            name: 'name',
            message: 'Enter full name for license information'
        },
        {
            type: 'input',
            name: 'year',
            message: 'Enter year in YYYY format for license information',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address'
        }
    ]);
};

//generates badges for the README based on the input from the user in the prompt
const generateBadge = (answers) => {
    if (answers.license === 'MIT') {
        return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    } else if (answers.license === 'Mozilla') {
        return '[![License: Mozilla](https://)][License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
    } else {
        return '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
    }
}


//generates license information for the README based on the input from the user in the prompt
const generateLicense = (answers) => {
    if (answers.license === 'MIT') {
        return `MIT License\n\nCopyright (c) ${answers.year} ${answers.name}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    } else if (answers.license === 'Mozilla') {
        return 'Mozilla Public License\n\nVersion 2.0\n\nIf it is not possible or desirable to put the notice in a particular file, then You may include the notice in a location (such as a LICENSE file in a relevant directory) where a recipient would be likely to look for such a notice.\n\nYou may add additional accurate notices of copyright ownership.\n\nExhibit B - “Incompatible With Secondary Licenses” Notice\n\nThis Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.'
    } else {
        return ' GNU GENERAL PUBLIC LICENSE\nVersion 3, 29 June 2007\n\nCopyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n\nYou should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary.\n\nFor more information on this, and how to apply and follow the GNU GPL, see <https://www.gnu.org/licenses/>.\n\nThe GNU General Public License does not permit incorporating your program into proprietary programs.  If your program is a subroutine library, you may consider it more useful to permit linking proprietary applications with the library.  If this is what you want to do, use the GNU Lesser General Public License instead of this License.  But first, please read <https://www.gnu.org/licenses/why-not-lgpl.html>.'
    }
}

//generates the content for the README file that will be created
const generateREADME = (answers) =>
    `# ${answers.title}

${generateBadge(answers)}

## Table of Contents:

- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [Questions](#questions)
- [License Information](#license-information)

## Description:

${answers.description}

## Installation Instructions:

${answers.install}

## Usage Information:

${answers.usage}

## Contribution Guidelines:

${answers.contribution}

## Test Instructions:

${answers.test}

## Questions:

Where to reach out if there are any questions:

[GitHub Profile](https://github.com/${answers.github})

[Email](mailto:${answers.email})

## License Information:

${generateLicense(answers)}`

//writes the README file based on the information from the user and the content set up in the generateREADME function
const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
        .then(() => console.log('Successfully wrote to README.md'))
        .catch((err) => console.error(err));
}

//runs the initialization function
init();