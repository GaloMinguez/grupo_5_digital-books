module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("category", [
        { name: "Administrador" },
        { name: "Cliente" },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("category", null, {});
    },
  };