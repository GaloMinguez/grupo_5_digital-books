module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('category', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
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
        },        
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('category');
    }
  };