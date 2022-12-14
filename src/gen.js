// generates the readme from template

// main generation function
const generateReadme = data => {
    return new Promise((resolve, reject) => {
        // reject promise if no data
        if (!data) {
            reject("No data.");
        }

        let readme =
`
# ${data.project}
${licenseBadge(data)}

## Description

${data.description}

## Table of Contents
${tocInstallation(data)}
- [Usage](#usage)
${tocImages(data)}
${tocFeatures(data)}
- [Credits](#credits)
${tocContribution(data)}
${tocTests(data)}
${tocQuestions(data)}
- [License](#license)

${installSection(data)}

## Usage

${data.usageData.usage}

${imageSection(data)}

${featureSection(data)}

${creditSection(data)}

${contributionSection(data)}

${testingSection(data)}

${questionSection(data)}

## License

${data.licenseData.licenseText}
`

        // create object of return data
        let returnData = {
            file: readme,
            saveLocation: data.saveLocation
        };

        // resolve promise and return object
        resolve(returnData);
    });
}

//------------//
// functions  //
//------------//
// these functions run operations to be used inside template strings
// assemble table of contents
function tocInstallation(data) {
    if (!data.installData.installConfirm) {
        return "";
    } else {
        return "- [Installation](#installation)";
    }
}

function tocContribution(data) {
    if (!data.contributionData.confirmContribute) {
        return "";
    } else {
        return "- [Contributing](#contributing)";
    }
}

function tocQuestions(data) {
    if (!data.contactData.confirmQuestions) {
        return "";
    } else {
        return "- [Questions](#questions)";
    }
}

function tocImages(data) {
    if (data.images) {
        return "- [Images](#images)";
    } else {
        return "";
    }
}

function tocFeatures(data) {
    if (data.features) {
        return "- [Features](#features)";
    } else {
        return "";
    }
}

function tocTests(data) {
    if (data.tests) {
        return "- [Tests](#tests)";
    } else {
        return "";
    }
}

// assemble individual sections
// installation
function installSection(data) {
    if (!data.installData.installConfirm) {
        return "";
    } else {
        return `
## Installation

${data.installData.installation}
`
    }
}

// contribution
function contributionSection(data) {
    if (!data.contributionData.confirmContribute) {
        return "";
    }
    else {
        if (data.contributionData.useCovenant) {
            return `
## Contributing

[This project uses the standard Contributor Covenant.](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.txt)
`
        } else {
        return `
## Contributing

${data.contributionData.customGuideline}
`
        }
    }
}

// contact
function questionSection(data) {
    if (data.contactData.confirmQuestions) {
        return `
## Questions

Have questions regarding the project? Feel free to contact me at ${data.contactData.email} or [here on GitHub](https://github.com/${data.githubUsername}).
`
    } else {
        return "";
    }
}

// images
function imageSection(data) {
    let imageText = "";
    if (data.images) {
        imageText = `
## Images

`
        data.images.forEach(image => {
            let newImage = `
![${image.alt}](${image.photo})

`
            imageText += newImage;
        });
        return imageText;
    } else {
        return "";
    }
}

// features
function featureSection(data) {
    let featureText = "";
    if (data.features) {
        featureText = `
## Features

`
        data.features.forEach(feature => {
            let newFeature = `
- ${feature.feature}

`
            featureText += newFeature;
        });
        return featureText;
    } else {
        return "";
    }
}

// credits
function creditSection(data) {
    let creditText = `
## Credits

Created by [${data.name}](https://github.com/${data.githubUsername})`
    if (data.credit) {
        creditText += " in tandem with: "
        data.credit.forEach(credit => {
            let newCredit = `
- [${credit.creditName}](https://github.com/${credit.creditUsername})

`
            creditText += newCredit;
        });
        return creditText;
    } else {
        creditText += `.
`
        return creditText;
    }
}

// testing
function testingSection(data) {
    let testingText = "";
    if (data.tests) {
        testingText = `
## Tests

`
        data.tests.forEach(test => {
            let newTest = `
- ${test.test}

`
            testingText += newTest;
        });
        return testingText;
    } else {
        return "";
    }
}

// handle adding license badge
function licenseBadge(data) {
    // type of chosen license (MIT, ISC, or APACHE)
    let type = data.licenseData.license;
    let addedBadge = "";

    // switch statement to pick badge
    switch(type) {
        case "MIT":
            addedBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "ISC":
            addedBadge = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
            break;
        case "APACHE":
            addedBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
            break;
        default:
            break;
    }

    return addedBadge;
}

//--------//
// export //
//--------//
module.exports = generateReadme;