module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("payments", [
        { name: "Efectivo" },
        { name: "Tarjeta de Debito" },
        { name: "Tarjeta de Credito" },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("payments", null, {});
    },
  };