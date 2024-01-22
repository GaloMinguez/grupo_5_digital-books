module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
        },
        createdAt: {
            type: Sequelize.TIMESTAMP,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
          },
          updatedAt: {
            type: Sequelize.TIMESTAMP,
            allowNull: true,
          },
          deletedAt: {
            type: Sequelize.TIMESTAMP,
            allowNull: true,
          }
    };
    let config = {
        tableName: 'category',
        timestamps: true,
        deletedAt: false
    };
    const Categoria = sequelize.define(alias, cols, config)
    
    Categoria.associate = function(models){
        Categoria.hasMany(models.Usuario, {
            as: "categoria",
            foreignKey: "category_id"
        })
    }
    
    return Categoria;
}