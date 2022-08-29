//------------//
// require    //
//------------//
const inquirer = require("inquirer"); // inquirer npm package
const gen = require("./src/gen.js"); // generator
const write = require("./src/writefile.js"); // filesystem writing

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
        type: "confirm",
        name: "installConfirm",
        message: "Does your application need to be installed? ",
        default: true
    },
    {
        type: "input",
        name: "installation",
        message: "Please describe how to install your project: ",
        when: ({installConfirm}) => {
            if (installConfirm) {
                return true;
            } else {
                return false;
            }
        },
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
        message: "Are you seeking contributions from others? ",
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
        type: "input",
        name: "customGuideline",
        message: "Please describe your contribution guidelines: ",
        when: ({useCovenant, confirmContribute}) => {
            if (!useCovenant && confirmContribute) {
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
// inquirer prompts
// simple functions up top
// for project / initialization
const inquireInit = () => {
    return inquirer.prompt(initPrompt);
}

// for installation
const inquireInstall = data => {
    return inquirer.prompt(installationPrompt)
        .then(installData => {
            // create an array to store this data, then pass it on
            if (!data.installData) {
                data.installData = [];
            }
            
            data.installData = installData;
            return data;
        });
}

// for usage
const inquireUsage = data => {
    return inquirer.prompt(usagePrompt)
        .then(usageData => {
            // create an array to store this data, then pass it on
            if (!data.usageData) {
                data.usageData = [];
            }
            
            data.usageData = usageData;
            return data;
        });
}

// for contribution guidelines
const inquireContribution = data => {
    return inquirer.prompt(contributionPrompt)
        .then(contributionData => {
            // create an array to store this data, then pass it on
            if (!data.contributionData) {
                data.contributionData = [];
            }
            
            data.contributionData = contributionData;
            return data;
        });
}

// for license selection
const inquireLicense = data => {
    return inquirer.prompt(licensePrompt)
        .then(licenseData => {
            // create an array to store this data, then pass it on
            if (!data.licenseData) {
                data.licenseData = [];
            }
            
            data.licenseData = licenseData;
            return data;
        });
}

// loopable functions down here
// for images
const inquireImage = data => {
    // create a an array within the data to store the image references
    if (!data.images) {
        data.images = [];
    }

    // now prompt user
    return inquirer.prompt(imagePrompt)
        .then(imageData => {
            // add this data to the images array
            data.images.push(imageData);

            // are they adding another image?
            if (imageData.addNewPhoto) {
                return inquireImage(data); // callback (loop)
            } else {
                return data; // else return the data
            }
        });
}

// for credit // collab
const inquireCredit = data => {
    return inquirer.prompt(initCreditPrompt)
        .then(initData => {
            // are we adding collaborators?
            if (initData.initCollab) {
                // let's prompt them in a loop
                return loopCredit(data);
            } else {
                return data;
            }
        });
}
const loopCredit = data => { // this is a loopable function to be used in inquireCredit
    // create an array to store collaborators
    if (!data.credit) {
        data.credit = [];
    }

    return inquirer.prompt(loopCreditPrompt)
        .then(creditData => {
            // add data to array of collaborators
            data.credit.push(creditData);

            // are they adding another collaborator?
            if (creditData.addNewCollaborator) {
                return loopCredit(data);
            } else {
                return data;
            }
        });
}

// for feature listing
const inquireFeature = data => {
    return inquirer.prompt(initFeaturePrompt)
        .then(initData => {
            // are we adding features?
            if (initData.initFeature) {
                // let's prompt them in a loop
                return loopFeature(data);
            } else {
                return data;
            }
        });
}
const loopFeature= data => { // this is a loopable function to be used in inquireFeature
    // create an array to store features
    if (!data.features) {
        data.features = [];
    }

    return inquirer.prompt(loopFeaturePrompt)
        .then(featureData => {
            // add data to array of features
            data.features.push(featureData);

            // are they adding another feature?
            if (featureData.addNewFeature) {
                return loopFeature(data);
            } else {
                return data;
            }
        });
}

// for test listing
const inquireTesting = data => {
    return inquirer.prompt(initTestingPrompt)
        .then(initData => {
            // are we adding collaborators?
            if (initData.initTesting) {
                // let's prompt them in a loop
                return loopTesting(data);
            } else {
                return data;
            }
        });
}
const loopTesting = data => { // this is a loopable function to be used in inquireTesting
    // create an array to store tests
    if (!data.tests) {
        data.tests = [];
    }

    return inquirer.prompt(loopTestingPrompt)
        .then(testData => {
            // add data to array of tests
            data.tests.push(testData);

            // are they adding another test?
            if (testData.addNewTest) {
                return loopTesting(data);
            } else {
                return data;
            }
        });
}

//------------//
// init       //
//------------//
// main program
inquireInit()
    .then(inquireInstall)
    .then(inquireUsage)
    .then(dataSoFar => {
        if (dataSoFar.usageData.addImage) {
            return inquireImage(dataSoFar);
        } else {
            return dataSoFar;
        }
    })
    .then(inquireCredit)
    .then(inquireLicense)
    .then(inquireFeature)
    .then(inquireContribution)
    .then(inquireTesting)
    .then(dataSoFar => {
        return gen(dataSoFar);
    })
    .then(newFile => {
        return write(newFile, "./test/README.md");
    })
    .then(response => {
        console.log(response.message);
        console.log("Check your destination directory to open your ReadMe.");
    })
    .catch(error => {
        console.log(error);
    });