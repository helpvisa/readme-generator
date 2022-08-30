// require built-in node file writing package
const fs = require("fs");

// wraps writeFile function to work better in the promise chain used in index.js
const writeFile = (content, dest) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, content, err => {
            // throw if there's an error
            if (err) { 
                reject(err) // reject, sends to .catch
                // leave
                return;
            }

            // otherwise, all is well and function executed
            resolve({
                ok: true,
                message: "File generated."
            });
        });
    });
};

// exports
module.exports = writeFile;