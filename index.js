//------------//
// require    //
//------------//
const gen = require("./src/gen.js"); // generator
const write = require("./src/writefile.js"); // filesystem writing
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
    .then(inquireQuestions)
    .then(dataSoFar => {
        return gen(dataSoFar);
    })
    .then(genData => {
        return write(genData[0], genData[1].saveLocation);
    })
    .then(response => {
        console.log(response.message);
        console.log("Check your destination directory to open your ReadMe.");
    })
    .catch(error => {
        console.log(error);
    });