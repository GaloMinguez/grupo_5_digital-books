module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("detailOrder", [
        { order_id: 1, product_id: 16, quantity: 2, priceBuy: 15000 },
        { order_id: 1, product_id: 18, quantity: 2, priceBuy: 15000 },
        { order_id: 2, product_id: 1, quantity: 2, priceBuy: 15000 },
        { order_id: 2, product_id: 2, quantity: 2, priceBuy: 15000 },
        { order_id: 3, product_id: 3, quantity: 2, priceBuy: 15000 },
        { order_id: 3, product_id: 4, quantity: 2, priceBuy: 15000 },
        { order_id: 4, product_id: 5, quantity: 2, priceBuy: 15000 },
        { order_id: 4, product_id: 6, quantity: 2, priceBuy: 15000 },
        { order_id: 5, product_id: 7, quantity: 2, priceBuy: 15000 },
        { order_id: 5, product_id: 8, quantity: 2, priceBuy: 15000 },
        { order_id: 6, product_id: 9, quantity: 2, priceBuy: 15000 },
        { order_id: 6, product_id: 10, quantity: 2, priceBuy: 15000 },
        { order_id: 7, product_id: 11, quantity: 2, priceBuy: 15000 },
        { order_id: 7, product_id: 12, quantity: 2, priceBuy: 15000 },

      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("detailOrder", null, {});
    },
  };
