
module.exports = {
    db_host: "localhost",
    db_diarect: "mysql",
    db_name: "acrux_db",
    db_user: "dev",
    db_passwd: "password",
    source_dir: "/Users/cliff1215/Desktop/Projects/Dicom_Images/source_dir",
    target_dir: "/Users/cliff1215/Desktop/Projects/Dicom_Images/dbimage_dir",
    dcm_conv_cmd: "/Users/cliff1215/Temp/gdcm-build/bin/gdcmconv",
    dcm_conv_opt: "-w",
    dcm_conv_suffix: "_el",
    dcm_json_cmd: "/Users/cliff1215/DevTools/dcm4che-3.3.8/bin/dcm2json",
    dcm_json_opt: "-b",
    dcm_json_suffix: ".json"
}