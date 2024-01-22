module.exports = (sequelize, dataTypes) => {
    let alias = 'CarroDetalle';
    let cols = {
        cart_item_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        cantidad:{
            type: dataTypes.INTEGER,
            allowNull: true,
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
        tableName: 'detailCart',
        timestamps: true,
        deletedAt: false
    };
    const CarroDetalle = sequelize.define(alias, cols, config)
    
    CarroDetalle.associate = function(models){
        CarroDetalle.hasMany(models.CarroCompras, {
            as: "carrocompras",
            foreignKey: "cart_id"
        })
    }

    return CarroDetalle;
}