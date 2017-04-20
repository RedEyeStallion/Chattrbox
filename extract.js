// import path module
var path = require('path');

var extractFilePath = function (url) {
    var filePath;
    var fileName = 'index.html';

    if (url.length > 1) {
        fileName = url.substring(1);
    }

    console.log('The fileName is: ' + fileName);

    filePath = path.resolve(__dirname, 'app', fileName);
    return filePath;
};
// make extractFilePath function available so other modules can import it
module.exports = extractFilePath;
