module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("cart", [
        { user_id: 1, status: "A" },
        { user_id: 2, status: "A" },
        { user_id: 5, status: "A" },
        { user_id: 3, status: "A" },
        { user_id: 2, status: "C" },
        { user_id: 4, status: "C" },
        { user_id: 5, status: "A" },
        { user_id: 2, status: "C" },
        { user_id: 1, status: "C" },
        { user_id: 1, status: "A" },
        { user_id: 2, status: "C" },
        { user_id: 4, status: "A" },
        { user_id: 3, status: "C" },
        { user_id: 4, status: "A" },
        { user_id: 5, status: "C" },
        { user_id: 3, status: "A" },
        { user_id: 2, status: "C" },
        { user_id: 1, status: "C" },
        { user_id: 5, status: "A" },
        { user_id: 2, status: "A" },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("cart", null, {});
    },
  };
