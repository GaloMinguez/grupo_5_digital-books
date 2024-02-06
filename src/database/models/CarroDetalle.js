module.exports = (sequelize, dataTypes) => {
  let alias = "CarroDetalle";
  let cols = {
    cart_item_id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    cantidad: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
  };
  let config = {
    tableName: "detailCart",
    timestamps: false,
    deletedAt: false,
  };
  const CarroDetalle = sequelize.define(alias, cols, config);

  CarroDetalle.associate = function (models) {
    CarroDetalle.belongsTo(models.CarroCompras, {
      as: "carrocompras",
      foreignKey: "cart_id",
    });
  };

  return CarroDetalle;
};
