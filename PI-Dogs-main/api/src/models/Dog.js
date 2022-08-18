const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    height: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    lifeSpan: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
    },
  });
};
