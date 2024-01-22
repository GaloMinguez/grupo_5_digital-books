module.exports = (sequelize, dataTypes) => {
    let alias = 'Pedido';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        payment_id:{
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
        tableName: 'orders',
        timestamps: true,
        deletedAt: false
    };
    const Pedido = sequelize.define(alias, cols, config)
    
    Pedido.associate = function(models){
        Pedido.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "user_id"
        })
    }

    Pedido.associate = function(models){
        Pedido.hasMany(models.TipoPago, {
            as: "tipopago",
            foreignKey: "payment_id"
        })
    }

    return Pedido;
}