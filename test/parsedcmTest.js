
const assert = require('chai').assert;
const parsedcm = require('../parsedcm');

describe('ParseDcm', () => {
    it ('make json full path name from input file name', () => {
        var path = parsedcm.getJsonPath("/Users/cliff1215/Desktop/Projects/Dicom_Images/CTS01_Chest_nocmp_el.dcm");
        console.log(path);
        assert.equal(path, '/Users/cliff1215/Desktop/Projects/Dicom_Images/json/CTS01_Chest_nocmp_el.dcm.json');
    });
});

describe('ParseDcm', () => {
    it ('parsedcm module return dicom file information', async () => {
        var dcmInfo = await parsedcm.getDcmInfo('/Users/cliff1215/Desktop/Projects/NodeJS/06_regDcmToDB/test/MRH05_nocmp_el.dcm.json');
        console.log(dcmInfo);
        assert.equal(dcmInfo.pa_id, '38889400');
    });
});

