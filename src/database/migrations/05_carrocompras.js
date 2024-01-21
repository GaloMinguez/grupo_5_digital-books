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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cart');
    }
};