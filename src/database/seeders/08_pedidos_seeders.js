module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("orders", [
        { user_id: 1, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 5, payment_id: 3, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 3, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 4, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 5, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 1, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 1, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 4, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 3, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 4, payment_id: 3, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 5, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 3, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 1, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "C" },
        { user_id: 5, payment_id: 1, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
        { user_id: 2, payment_id: 2, shippinAddress: '', dateOrder: new Date(), amountTotal: 1, status: "A" },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("orders", null, {});
    },
  };