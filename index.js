//------------//
// require    //
//------------//
const inquirer = require("inquirer"); // inquirer npm package

//------------//
// variables  //
//------------//
// arrays which contain questions about the project
// initialize first questions about project
const initPrompt = [
    {
        type: "input",
        name: "project",
        message: "What is the name of your project? ",
        validate: projInput => {
            if (projInput) {
                return true;
            } else {
                console.log("Your project needs a name.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Describe the project: ",
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log("A professional readme needs a description.");
                return false;
            }
        }
    },
];

// explanations for installation
const installationPrompt = [
    {
        type: "input",
        name: "installation",
        message: "Please describe how to install your project: ",
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log("Please include installation instructions.");
                return false;
            }
        }
    }
];

// questions regarding usage, adding images
const usagePrompt = [
    {
        type: "input",
        name: "usage",
        message: "Describe how an end-user should operate your project / program: ",
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log("People need to know how to use your project.");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "addImage",
        message: "Would you like to include images in your ReadMe? ",
        default: false
    }
];
const imagePrompt = [
    {
        type: "input",
        name: "photo",
        message: "Please enter the filesystem location of your image (ex: ./images/preview.jpg): ",
        validate: photoInput => {
            if (photoInput) {
                return true;
            } else {
                console.log("Please enter an address.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "alt",
        message: "Please type some alt text for your image: ",
        validate: altInput => {
            if (altInput) {
                return true;
            } else {
                console.log("All images need alt text.");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "addNewPhoto",
        message: "Would you like to add another image? ",
        default: false
    }
];

// questions regarding credits / collaborators
const initCreditPrompt = [ // initial check
    {
        type: "confirm",
        name: "initCollab",
        message: "Was this project made with the help of any other collaborators? ",
        default: false
    }
];
const loopCreditPrompt = [ // recursive check (can be called again and again)
    {
        type: "input",
        name: "creditName",
        message: "Please enter the collaborator's name: ",
        validate: collabInput => {
            if (collabInput) {
                return true;
            } else {
                console.log("Please enter a name.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "creditUsername",
        message: "Please enter the collaborator's GitHub username: ",
        validate: usernameInput => {
            if (usernameInput) {
                return true;
            } else {
                console.log("Please enter a username.");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "addNewCollaborator",
        message: "Did you work with any additional collaborators? ",
        default: false
    }
];

// select a license
const licensePrompt = [
    {
        type: "checkbox",
        name: "license",
        message: "Please select a license for your project: ",
        choices: ["MIT", "ISC"]
    }
];

// badges, do we need these? maybe...
// they will go here eventually

// prompt about features
const initFeaturePrompt = [ // initialize prompt
    {
        type: "confirm",
        name: "initFeature",
        message: "Would you like to include a list of features? ",
        default: false
    }
];
const loopFeaturePrompt = [ // loopable if necessary
    {
        type: "input",
        name: "feature",
        message: "Describe your feature: ",
        validate: featureInput => {
            if (featureInput) {
                return true;
            } else {
                console.log("Please include a description.");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "addNewFeature",
        message: "Would you like to add another feature? ",
        default: false
    }
];

// prompt about contributions
const contributionPrompt = [
    {
        type: "confirm",
        name: "confirmContribute",
        message: "Do you want to seek contributions from others? ",
        default: false
    },
    { // if user wants contributors, do they want a standard set of guidelines or their own?
        type: "confirm",
        name: "useCovenant",
        message: "Would you like to use the default Contributor Covenant? ",
        default: true,
        when: ({confirmContribute}) => {
            if (confirmContribute) {
                return true;
            } else {
                return false;
            }
        }
    },
    { // they would like to write their own if they say no to the above!
        type: "confirm",
        name: "customGuideline",
        message: "Please describe your contribution guidelines: ",
        when: ({useCovenant}) => {
            if (!useCovenant) {
                return true;
            } else {
                return false;
            }
        }
    }
];

// prompt about testing
const initTestingPrompt = [ // initialize prompt
    {
        type: "confirm",
        name: "initTesting",
        message: "Would you like to include tests in your ReadMe? ",
        default: false
    }
];
const loopTestingPrompt = [ // loopable if necessary
    {
        type: "input",
        name: "test",
        message: "Describe how to run your test: ",
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log("Please describe how your test works.");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "addNewTest",
        message: "Would you like to include another test? ",
        default: false
    }
];

//------------//
// functions  //
//------------//


//------------//
// init       //
//------------//
