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
        }    
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('category');
    }
  };