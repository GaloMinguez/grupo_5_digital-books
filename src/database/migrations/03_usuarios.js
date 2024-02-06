module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            fullName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'category',
                    key: 'id'
                },
            },
            avatar: {
                type: Sequelize.STRING(155),
                defaultValue: 'default.png',
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};