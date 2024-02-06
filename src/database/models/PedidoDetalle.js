module.exports = (sequelize, dataTypes) => {
    let alias = 'PedidoDetalle';
    let cols = {
        order_item_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        quantity:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        priceBuy:{
            type: dataTypes.DECIMAL,
            allowNull: false,
        },        
    };
    let config = {
        tableName: 'detailOrder',
        timestamps: false,
        deletedAt: false
    };
    const PedidoDetalle = sequelize.define(alias, cols, config)
    
    PedidoDetalle.associate = function(models){
        PedidoDetalle.belongsTo(models.Pedido, {
            as: "pedido",
            foreignKey: "order_id"
        })
    }

    PedidoDetalle.associate = function(models){
        PedidoDetalle.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "product_id"
        })
    }

    return PedidoDetalle;
}