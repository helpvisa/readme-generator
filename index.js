//------------//
// require    //
//------------//
const gen = require("./src/gen.js"); // generator
const write = require("./src/writefile.js"); // filesystem writing
const licenser = require("./src/licenser.js"); // license generator
const {
    inquireInit,
    inquireInstall,
    inquireUsage,
    inquireContribution,
    inquireLicense,
    inquireQuestions,
    inquireImage,
    inquireCredit,
    inquireFeature,
    inquireTesting } = require("./src/prompts.js"); // inquirer prompts

//------------//
// init       //
//------------//
// main program
inquireInit()
    .then(inquireInstall)
    .then(inquireUsage)
    .then(dataSoFar => {
        if (dataSoFar.usageData.addImage) {
            return inquireImage(dataSoFar).catch(err => {
                console.log(err);
            });
        } else {
            return dataSoFar;
        }
    })
    .then(inquireCredit)
    .then(inquireLicense)
    .then(dataSoFar => {
        return licenser(dataSoFar).catch(err => {
            console.log(err);
        });
    })
    .then(inquireFeature)
    .then(inquireContribution)
    .then(inquireTesting)
    .then(inquireQuestions)
    .then(dataSoFar => {
        return gen(dataSoFar).catch(err => {
            console.log(err);
        });
    })
    .then(genData => {
        return write(genData.file, genData.saveLocation).catch(err => {
            console.log(err);
        });
    })
    .then(response => {
        console.log(response.message);
        console.log("Check your destination directory to open your ReadMe.");
    })
    .catch(err => {
        console.log(err);
    });