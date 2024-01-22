module.exports = (sequelize, dataTypes) => {
  let alias = "CarroCompras";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
    status: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "cart",
    timestamps: false,
    deletedAt: false,
  };

  const CarroCompras = sequelize.define(alias, cols, config);

  CarroCompras.associate = function (models) {
    CarroCompras.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "user_id",
    });
  };

  return CarroCompras;
};
