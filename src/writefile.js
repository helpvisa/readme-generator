// require built-in node file writing package
const fs = require("fs");

// these functions rewrite the default fs functionality to be asynchronous
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