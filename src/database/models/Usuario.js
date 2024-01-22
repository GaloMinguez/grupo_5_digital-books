module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_Name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        avatar: {
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
        tableName: 'users',
        timestamps: true,
        deletedAt: false
    };
    const Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "category_id"
        });
    }

    return Usuario;
}