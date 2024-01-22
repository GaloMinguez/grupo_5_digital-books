module.exports = (sequelize, dataTypes) => {
    let alias = 'CarroCompras';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: dataTypes.INTEGER
        },
        status: {
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
        tableName: 'cart',
        timestamps: true,
        deletedAt: false
    };
    const CarroCompras = sequelize.define(alias, cols, config)
    
    CarroCompras.associate = function(models){
        CarroCompras.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "user_id"
        })
    }

    return CarroCompras;
}