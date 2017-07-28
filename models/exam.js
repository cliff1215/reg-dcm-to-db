/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exam', {
        id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true
        },
        patient_id: {
            type: DataTypes.STRING(64),
            allowNull: false,
            references: {
                model: 'patient',
                key: 'id'
            }
        },
        study_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        modality: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        study_id: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        accession_no: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        bodypart: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        clinic_dr_id: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        operator_id: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        operator_comment: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_verified: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'N'
        },
        verifying_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        verifying_user_id: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        default_layout_x: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '2'
        },
        default_layout_y: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '2'
        },
        series_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        image_count: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        update_user_id: {
            type: DataTypes.STRING(16),
            allowNull: false,
            defaultValue: 'SYSTEM'
        }
    }, {
        tableName: 'exam',
        underscored: true,
        timestamps: false
    });
};
