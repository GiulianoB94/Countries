const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subregion: {
        type: DataTypes.STRING, //No está dentro de un objeto
        allowNull: true,
      },
      area: {
        type: DataTypes.INTEGER, //Valor numérico
        allowNull: true,
      },
      population: {
        type: DataTypes.INTEGER, //Valor numérico
        allowNull: true,
      },
      flags: {
        type: DataTypes.STRING, //Imagen
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
