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
        createdAt: {
			allowNull: false,
			type: dataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			allowNull: false,
			type: dataTypes.DATE
		},
        deletedAt:{
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'detailOrder',
        timestamps: true,
        deletedAt: false
    };
    const PedidoDetalle = sequelize.define(alias, cols, config)
    
    PedidoDetalle.associate = function(models){
        PedidoDetalle.hasMany(models.CarroCompras, {
            as: "pedido",
            foreignKey: "order_id"
        })
    }

    PedidoDetalle.associate = function(models){
        PedidoDetalle.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "product_id"
        })
    }

    return PedidoDetalle;
}