const path = require('path');
var fs = require('fs');
var dicomParser = require('dicom-parser');

// ex, dt = '19951125'
// return '1995-11-25'
var addHyphensToDate = (dt) => {
    return !dt || dt.length != 8 
            ? ""
            : dt.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

// ex, tm = '123531'
// return '12:35:31'
var addColonToTime = (tm) => {
    return !tm || tm.length < 6 
            ? "" 
            : tm.substring(0, 6).replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2:$3');
}

var makeDateForMySQL = (dt, tm) => {
    return !dt || !tm 
            ? ""
            : addHyphensToDate(dt) + " " + addColonToTime(tm);
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

var getJsonFullPath = (filename) => {
    let onlyFileName = path.basename(filename);
    let onlyPath = path.dirname(filename);

    return onlyPath + "/json/" + onlyFileName + ".json";
}
module.exports.getJsonPath = getJsonFullPath;

module.exports.getDcmInfo = async (filename) => {
    try {
        let data = await loadFile(filename);

        let byteArray = new Uint8Array(data);
        let dataSet = dicomParser.parseDicom(byteArray);

        let exDate = makeDateForMySQL(dataSet.string('x00080020'), 
                                        dataSet.string('x00080030'));
        let seDate = makeDateForMySQL(dataSet.string('x00080021'), 
                                      dataSet.string('x00080031'));
        let imDate = makeDateForMySQL(dataSet.string('x00080023'), 
                                         dataSet.string('x00080033'));

        if (exDate === "") 
            exDate = (new Date()).toISOString().substring(0, 19).replace('T', ' ');
        if (seDate === "")
            seDate = exDate;
        if (imDate === "")
            imDate = exDate;

        return {
            pa_id: dataSet.string('x00100020'),
            pa_name: dataSet.string('x00100010'),
            pa_birthdate: dataSet.string('x00100030'),
            pa_sex: dataSet.string('x00100040'),

            ex_id: dataSet.string('x0020000d'), 
            ex_date: exDate, 
            ex_modality: dataSet.string('x00080060'),
            ex_desc: dataSet.string('x00081030'), 
            ex_studyid: dataSet.string('x00200010'), 
            ex_accessno: dataSet.string('x00080050'), 
            ex_bodypart: dataSet.string('x00180015'),

            se_id: dataSet.string('x0020000e'), 
            se_no: dataSet.intString('x00200011'),
            se_desc: dataSet.string('x0008103e'),
            se_date: seDate,
            se_imagetype: dataSet.string('x00080008'),
             
            im_id: dataSet.string('x00080018'), 
            im_no: dataSet.intString('x00200013'),
            im_acqdate: imDate, 
            im_window: dataSet.floatString('x00281050'),
            im_level: dataSet.floatString('x00281051'),
            //im_path: "/Users/cliff1215/Desktop/Projects/Dicom_Images/json"
            im_path: getJsonFullPath(filename)
        };
    } catch (e) {
        console.log('@@@ ERROR getParseDcm - ' - e);    
    }
} 
