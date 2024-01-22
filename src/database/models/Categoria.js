module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        } 
    };
    let config = {
        tableName: 'category',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config)
    
    Categoria.associate = function(models){
        Categoria.hasMany(models.Usuario, {
            as: "usuario",
            foreignKey: "category_id"
        })
    }

    return Categoria;
}