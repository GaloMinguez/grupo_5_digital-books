module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('orders', {
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
            payment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'payments',
                    key: 'id'
                },
            },                
            shippinAddress: {
                type: Sequelize.STRING(350),
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            dateOrder: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            amountTotal: {
                type: Sequelize.DECIMAL(10,2),
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
        return queryInterface.dropTable('orders');
    }
};