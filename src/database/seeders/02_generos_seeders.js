module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("genres", [
        { name: "Literatura" },
        { name: "Consulta y referencia" },
        { name: "Artistico e ilustrado" },
        { name: "Divulgativo" },
        { name: "Texto" },
        { name: "Tecnico" },
        { name: "Practico" },
        { name: "Religion" },
        { name: "Autoayuda" },
        { name: "Infantil" },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("genres", null, {});
    },
  };