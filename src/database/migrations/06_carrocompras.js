module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cart', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
            },    
            status: {
                type: Sequelize.STRING(10),
                allowNull: true,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cart');
    }
};