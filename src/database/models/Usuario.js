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
    };
    let config = {
        tableName: 'users',
        timestamps: false
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