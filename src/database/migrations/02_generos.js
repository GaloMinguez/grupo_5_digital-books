module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('genres', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(100),
        }       
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('genres');
    }
  };