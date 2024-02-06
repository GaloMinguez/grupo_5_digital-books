module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('payments', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(30),
        }       
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('payments');
    }
  };