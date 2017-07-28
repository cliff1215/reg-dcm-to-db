/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('patient', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    name2: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    birth_date: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    tableName: 'patient',
    underscored: true,
    timestamps: false
  });
};
