module.exports = (sequelize, dataTypes) => {
    let alias = 'TipoPago';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
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
        tableName: 'payments',
        timestamps: true,
        deletedAt: false
    };
    const TipoPago = sequelize.define(alias, cols, config)
    
    TipoPago.associate = function(models){
        TipoPago.hasMany(models.Pedido, {
            as: "pedido",
            foreignKey: "payment_id"
        })
    }

    return TipoPago;
}