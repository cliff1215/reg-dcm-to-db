
const env = require('./env');
const fileUtils = require('./fileutils');
const parseDcm = require('./parsedcm');
const dbsession = require('./dbsession');

const fs = require('fs');
const path = require('path');

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

var createElFile = async (fname) => {
    let elFName = getTargetFileName(fname, env.dcm_conv_suffix);
    let ret = await fileUtils.exeCmd(
        getConvertCmd(env.dcm_conv_cmd, env.dcm_conv_opt, fname, elFName) 
    );
    return ret && fs.existsSync(elFName) ? elFName : "";
}

var createJsonFile = async (elFName) => {
    let jsonFName = getTargetFileName(
        elFName, env.dcm_json_suffix, env.target_dir
    );
    ret = await fileUtils.exeCmd(
        getConvertCmd(env.dcm_json_cmd, env.dcm_json_opt, 
            elFName, jsonFName, ">")
    );
    if (!ret || !fs.existsSync(jsonFName)) {
        fileUtils.delFile(elFName);
        return "";
    } else {
        return jsonFName;
    }
}

var main = async () => {
    try {
        if (!dbsession.init()) {
            console.log('dbsession initialization fail!');
            return;
        }

        let fileNames = await fileUtils.getFileNames(env.source_dir);
        for (fname of fileNames) {
            let elFName = await createElFile(fname);
            if (!elFName) process.exit(1); //continue;
            let jsonFName = await createJsonFile(elFName);
            if (!jsonFName) process.exit(2); //continue;
            
            let dcmInfo = await parseDcm.getDcmInfo(elFName);
            if (!dcmInfo) {
                fileUtils.delFile(elFName);
                fileUtils.delFile(jsonFName);
                continue;
            } 
            dcmInfo.im_path = jsonFName;
   
            if (await dbsession.insertPatient(dcmInfo)
                    && await dbsession.insertExam(dcmInfo)
                    && await dbsession.insertSeries(dcmInfo)
                    && await dbsession.insertImage(dcmInfo)) {
                console.log("Register Success: [" + fname + "]");
                fileUtils.delFile(elFName);
                fileUtils.delFile(fname);
            }  
        }
        dbsession.close();
        process.exit();
    } catch (e) {
        console.log('@@@ ERROR main function' + e);
    }
}

main();