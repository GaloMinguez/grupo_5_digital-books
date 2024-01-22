module.exports = (sequelize, dataTypes) => {
    let alias = 'Genero';
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
        tableName: 'genres',
        timestamps: true,
        deletedAt: false
    };
    const Genero = sequelize.define(alias, cols, config)
    
    Genero.associate = function(models){
        Genero.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "genre_id"
        })
    }

    return Genero;
}