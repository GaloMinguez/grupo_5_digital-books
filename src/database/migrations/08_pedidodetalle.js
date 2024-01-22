module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('detailorder', {
            order_item_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'orders',
                    key: 'id'
                },
            },   
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                },
            },    
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            quantity: {
                priceBuy: Sequelize.DECIMAL,
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
        return queryInterface.dropTable('detailorder');
    }
};