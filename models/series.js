/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('series', {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    exam_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'exam',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    modality: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    bodypart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    image_type: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    layout_x: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '2'
    },
    layout_y: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '2'
    },
    image_count: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'series',
    underscored: true,
    timestamps: false
  });
};
