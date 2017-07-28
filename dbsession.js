const Sequelize = require('sequelize');

const sequelize = new Sequelize('acrux_db', 'dev', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
});
var Patient = null;
var Exam = null;
var Series = null;
var Image = null;

var init = () => {
    if (!sequelize) {
        return false;
    }
    Patient = sequelize.import('models/patient');
    Exam = sequelize.import('models/exam');
    Series = sequelize.import('models/series');
    Image = sequelize.import('models/image');
    return true;
}

var insertPatient = async (dcmInfo) => {
    try {
        var patInstance = await Patient.findById(dcmInfo.pa_id);
        if (patInstance)
            return true;

        patInstance = await Patient.create({
            id: dcmInfo.pa_id, 
            name: dcmInfo.pa_name, 
            birth_date: dcmInfo.pa_birthdate, 
            gender:dcmInfo.pa_sex
        });
        return patInstance ? true : false;
    } catch (e) {
        console.log('@@@ ERROR: dbsession.insertPatient!!!');
        return false;
    }
}

var insertExam = async (dcmInfo) => {
    try {
        var examInstance = await Exam.findById(dcmInfo.ex_id);
        if (examInstance)
            return true;

        examInstance = await Exam.create({
            id: dcmInfo.ex_id, 
            patient_id: dcmInfo.pa_id, 
            study_date: dcmInfo.ex_date, 
            modality: dcmInfo.ex_modality, 
            description: dcmInfo.ex_desc, 
            study_id: dcmInfo.ex_studyid, 
            accession_no: dcmInfo.ex_accessno, 
            bodypart: dcmInfo.ex_bodypart
        });
        return examInstance ? true : false;
    } catch (e) {
        console.log('@@@ ERROR: dbsession.insertExam!!!');
        return false;
    }
}

var insertSeries = async (dcmInfo) => {
    try {
        var seriesInstance = await Series.findById(dcmInfo.se_id);
        if (seriesInstance)
            return true;

        seriesInstance = await Series.create({
            id: dcmInfo.se_id, 
            exam_id: dcmInfo.ex_id, 
            number: dcmInfo.se_no, 
            modality: dcmInfo.ex_modality,
            bodypart: dcmInfo.ex_bodypart, 
            description: dcmInfo.se_desc, 
            start_date: dcmInfo.se_date, 
            image_type: dcmInfo.se_imagetype
        });
        return seriesInstance ? true : false;
    } catch (e) {
        console.log('@@@ ERROR: dbsession.insertSeries!!!');
        return false;
    }
}

var insertImage = async (dcmInfo) => {
    try {
        var imageInstance = await Image.findById(dcmInfo.im_id);
        if (imageInstance)
            return true;

        imageInstance = await Image.create({
            id: dcmInfo.im_id, 
            exam_id: dcmInfo.ex_id, 
            series_id: dcmInfo.se_id, 
            number: dcmInfo.im_no, 
            acquisition_date: dcmInfo.im_acqdate, 
            original_window: dcmInfo.im_window, 
            original_level: dcmInfo.im_level, 
            current_window: dcmInfo.im_window, 
            current_level: dcmInfo.im_level, 
            order: dcmInfo.im_no, 
            path: dcmInfo.im_path    
        });
        return imageInstance ? true : false;
    } catch (e) {
        console.log('@@@ ERROR: dbsession.insertImage!!!');
        return false;
    }
}

module.exports = {
    init: init,
    insertPatient: insertPatient,
    insertExam: insertExam,
    insertSeries: insertSeries,
    insertImage: insertImage
};