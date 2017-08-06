const env = require('../env');
const fileUtils = require('../fileutils');
const parsedcm = require('../parsedcm');
const assert = require('chai').assert;
const path = require('path');
const fs = require('fs');

var getTargetFileName = (srcFName, targetSuffic, targetDir = "") => {
    if (!targetDir) {
        return srcFName + targetSuffic;
    } else {
        return targetDir + "/" + path.basename(srcFName) + targetSuffic;
    }
}

var getConvertCmd = (cmd, opt, srcFName, targetFName, redirection = "") => {
    return cmd + " " + opt + " " 
            + srcFName + " " + redirection + " " + targetFName;
}
// var getConvElCmd = (srcFName) => {
//     return env.dcm_conv_cmd + " " + env.dcm_conv_opt + " " 
//             + srcFName + " " 
//             + getTargetFileName(srcFName, env.dcm_conv_suffix);
// };

// var getConvJsonCmd = (srcFName) => {
//     return env.dcm_json_cmd + " " + env.dcm_json_opt + " " 
//             + srcFName + " > " 
//             + getTargetFileName(srcFName, env.dcm_json_suffix, env.target_dir);
// };

describe('File_Utils.getFileNames', () => {
    it ('getting all file names in the env.source_dir', async () => {
        let fileNames = await fileUtils.getFileNames(env.source_dir);
        assert.equal(fileNames.length, 1);
    });
});

// describe('File_Utils.getDicomInfomation', () => {
//     it ('converting a source file to target emplicit little endian file', 
//     async () => {
//         let fileNames = await fileUtils.getFileNames(env.source_dir);
//         let targetFName = fileUtils.getTargetFileName(fileNames[0], 
//             env.dcm_conv_add_name);
//         let elFName = await fileUtils.exeCmd(env.dcm_conv_cmd, env.dcm_conv_opt,
//             fileNames[0], targetFName); 
//         let dcmInfo = await parsedcm.getDcmInfo(elFName);
//         fileUtils.delFile(targetFName);  
//         console.log(dcmInfo);   
//         assert.notEqual(dcmInfo, null);
//     });
// });

describe('File_Utils.getTargetFileName', () => {
    it ('converting a dcm file to an el dcm file and making json file from the el dcm file', 
    async () => {
        let fileNames = await fileUtils.getFileNames(env.source_dir);
        for (fname of fileNames) {
            let elFName = getTargetFileName(fname, env.dcm_conv_suffix);
            let ret = await fileUtils.exeCmd(
                getConvertCmd(env.dcm_conv_cmd, env.dcm_conv_opt, fname, elFName) 
            );
            let jsonFName = "";
            if (ret && fs.existsSync(elFName)) {
                jsonFName = getTargetFileName(elFName, env.dcm_json_suffix, env.target_dir);
                ret = await fileUtils.exeCmd(
                    getConvertCmd(env.dcm_json_cmd, env.dcm_json_opt, elFName, jsonFName, ">")
                );
                fileUtils.delFile(elFName);
            }
            assert.equal(fs.existsSync(jsonFName), true);
        }
        // let targetFName = getTargetFileName(fname, env.dcm_conv_suffix);
        // let cmd = getConvElCmd(fileNames[0]);
        // let ret = await fileUtils.exeCmd(cmd); 
        // let elFName = getTargetFileName(fileNames[0], env.dcm_conv_suffix);
        // if (ret && fs.existsSync(elFName)) {
        //     cmd = getConvJsonCmd(elFName);
        //     ret = await fileUtils.exeCmd(cmd);
        //     fileUtils.delFile(elFName);
        // }
        // elFName = getTargetFileName(elFName, env.dcm_json_suffix, env.target_dir);
        // assert.equal(fs.existsSync(elFName), true);
    });
});