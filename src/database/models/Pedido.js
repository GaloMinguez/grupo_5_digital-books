module.exports = (sequelize, dataTypes) => {
  let alias = "Pedido";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    payment_id: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },
    shippinAddress: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    dateOrder: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    amountTotal: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
  };
  let config = {
    tableName: "orders",
    timestamps: false,
    deletedAt: false,
  };
  const Pedido = sequelize.define(alias, cols, config);

  Pedido.associate = function (models) {
    Pedido.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "user_id",
    });
  };

  Pedido.associate = function (models) {
    Pedido.belongsTo(models.TipoPago, {
      as: "tipopago",
      foreignKey: "payment_id",
    });
  };

  return Pedido;
};
