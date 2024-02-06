module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING(255),
    },
    category_id: {
      type: dataTypes.INTEGER,
    },
    avatar: {
      type: dataTypes.STRING(155),
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
    paranoid: true,
  };
  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.belongsTo(models.Categoria, {
      as: "categoria",
      foreignKey: "category_id",
    });
  };

  /*Usuario.associate = function (models) {
    Usuario.hasMany(models.CarroCompra, {
      as: "carroscompra",
      foreignKey: "cart_id",
    });
  };*/

  return Usuario;
};
