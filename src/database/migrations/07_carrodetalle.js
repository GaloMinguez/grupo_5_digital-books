module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('detailcart', {
            cart_item_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cart',
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
            cantidad: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('detailcart');
    }
};