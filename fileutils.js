//
// This module is for file and directory
// Written by TICK, 2017-07-27
//
const fs = require('fs');
const exec = require('child_process').exec;

var exeCmd = (cmd) => {
    return new Promise((resolve, reject) => {
        console.log(cmd);
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            console.log(stdout);
            console.log(stderr);
            return resolve(true);
        }); 
    });
}

var getFileNamesSync = (dir, isRecursive = false) => {
    let result1 = [], result2 = [];
    let files = fs.readdirSync(dir);
    for (let i in files) {
        if (files[i][0] === '.')
            continue;
        
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            if (isRecursive) {
                result2 = getFileNamesSync(name, isRecursive);
            }
        } else {
            result1.push(name);
        }
    }
    return result1.concat(result2);
}

//
// Get file names with full path in the 'path', 
// excluding directories and files starting with '.', 
// not recursive.
//
var getFileNames = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            }
            //return resolve(files);
            result = [];
            for (let i in files) {
                if (files[i][0] === '.')
                    continue;

                let fpname = path + "/" + files[i];
                if (!fs.statSync(fpname).isDirectory()) {
                    result.push(fpname);
                }
            }
            return resolve(result);
        });
    });
}

var loadFile = (filelname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filelname, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

var delFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        });
    });
};

module.exports = {
    exeCmd: exeCmd,
    getFileNames: getFileNames,
    getFileNamesSync: getFileNamesSync,
    loadFile: loadFile,
    delFile: delFile
};