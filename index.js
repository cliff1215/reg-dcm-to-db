
var parseDcm = require('./parsedcm');
const dbsession = require('./dbsession');

var main = async () => {
    try {
        if (!dbsession.init()) {
            console.log('dbsession initialization fail!');
            return;
        }
        
        let dcmInfo = await parseDcm.getDcmInfo(process.argv[2]);
        if (await dbsession.insertPatient(dcmInfo)
                && await dbsession.insertExam(dcmInfo)
                && await dbsession.insertSeries(dcmInfo)
                && await dbsession.insertImage(dcmInfo)) {
            console.log("Register Success: [" + process.argv[2] + "]");
        }
        dbsession.close();
    } catch (e) {
        console.log('@@@ ERROR main function' + e);
    }
}

main();