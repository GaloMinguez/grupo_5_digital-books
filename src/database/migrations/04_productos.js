module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id'
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      descriptionD: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      publisher: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      imgTop: {
        type: Sequelize.STRING(60),
        defaultValue: 'default.png',
        allowNull: true,
      },
      imgBack: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      alt: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos');
  }
};