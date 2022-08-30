// handles creating a license for the user's readme based on three preset options

// require
const fs = require("fs"); // need for reading license txts

//------------//
// functions  //
//------------//
// these first few are promises, the final function combines them to generate an outputted file
// selects the right license
const pickLicense = data => {
    return new Promise((resolve, reject) => {
        // var to store license
        let license = '';

        // read license from txt file (use synchronous readFile)
        if (data.licenseData.license === "MIT") {
            try {
                license = fs.readFileSync("./licenses/mit.txt", "utf8");
            } catch (err) {
                reject(err);
            }
        } else if (data.licenseData.license === "ISC") {
            try {
                license = fs.readFileSync("./licenses/isc.txt", "utf8");
            } catch (err) {
                reject(err);
            }
        } else if (data.licenseData.license === "APACHE") {
            try {
                license = fs.readFileSync("./licenses/apache.txt", "utf8");
            } catch (err) {
                reject(err);
            }
        } else {
            reject("No suitable license found.") // reject if bad license is somehow picked
        }

        // modify license to project's standard
        // grab date
        let dateObj = new Date();
        let currentYear = dateObj.getFullYear();
        license = license.replace("<YEAR>", currentYear);
        license = license.replace("<OWNER>", data.name);

        // set new index in data obj
        data.licenseData.licenseText = license;

        // resolve and send back data
        resolve(data);
    });
}

module.exports = pickLicense;