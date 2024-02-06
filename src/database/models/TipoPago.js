module.exports = (sequelize, dataTypes) => {
  let alias = "TipoPago";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "payments",
    timestamps: false,
    paranoid: true,
  };
  const TipoPago = sequelize.define(alias, cols, config);

  TipoPago.associate = function (models) {
    TipoPago.hasMany(models.Pedido, {
      as: "pedidos",
      foreignKey: "order_id",
    });
  };

  return TipoPago;
};
