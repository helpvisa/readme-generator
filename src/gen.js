// generates the readme from template
const generateReadme = data => {
    let readme =
`
# ${data.project}

## Description

${data.description}

## Table of Contents
${tocInstallation(data)}
- [Usage](#usage)
${tocImages(data)}
${tocFeatures(data)}
- [Credits](#credits)
${tocContribution(data)}
- [License](#license)
${tocTests(data)}

${installSection(data)}

## Usage

${data.usageData.usage}

${imageSection(data)}

${featureSection(data)}

## Credits

<PLACEHOLDER FOR FUNCTION>

${contributionSection(data)}

## License

${data.licenseData.license}

${testingSection(data)}
`

    // return this string
    return readme;
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

<COVENANT GOES HERE>
`
        } else {
        return `
## Contributing

${data.contributionData.customGuideline}
`
        }
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

// export
module.exports = generateReadme;