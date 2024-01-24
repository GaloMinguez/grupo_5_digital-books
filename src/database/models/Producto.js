module.exports = function (sequelize, dataTypes) {
  let alias = "Producto";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING,
    },
    author: {
      type: dataTypes.STRING,
    },
    genre_id: {
      type: dataTypes.INTEGER,
    },
    description: {
      type: dataTypes.TEXT,
    },
    descriptionD: {
      type: dataTypes.TEXT,
    },
    publisher: {
      type: dataTypes.STRING,
    },
    imgTop: {
      type: dataTypes.STRING,
    },
    imgBack: {
      type: dataTypes.STRING,
    },
    alt: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DOUBLE,
    },
    discount: {
      type: dataTypes.DOUBLE,
    },
    category: {
      type: dataTypes.STRING,
    },
    stock: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "products",
    paranoid: false,
    timestamps: false,
  };

  let Producto = sequelize.define(alias, cols, config);

  Producto.associate = function (models) {
    Producto.belongsTo(models.Genero, {
      as: "genero",
      foreignKey: "genre_id",
    });
  };

  return Producto;
};
