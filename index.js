"use strict";
exports.__esModule = true;
var shell = require("shelljs");
function changeAllFiles(names) {
    names.map(function (item) {
        shell.mv(item, item.replace(/(.component.less)$/g, '.module.less'));
        console.log('name===>', item);
    });
}

function findAllFiles() {
    var fileList = shell.find('.').filter(function (file) {
        return file.match(/(.component.less)$/);
    });
    return fileList;
}
changeAllFiles(findAllFiles());
