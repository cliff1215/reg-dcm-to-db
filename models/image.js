/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('image', {
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
    series_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'series',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    acquisition_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    original_window: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    original_level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    current_window: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    current_level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rotate: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    zoom_factor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '1'
    },
    start_x: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    start_y: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'image',
    underscored: true,
    timestamps: false
  });
};
