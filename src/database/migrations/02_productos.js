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
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      imgTop: {
        type: Sequelize.STRING(45),
        defaultValue: 'default.png',
        allowNull: true,
      },
      imgBack: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      alt: {
        type: Sequelize.STRING(20),
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
      },
      createdAt: {
        type: Sequelize.TIMESTAMP,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updatedAt: {
        type: Sequelize.TIMESTAMP,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.TIMESTAMP,
        allowNull: true,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos');
  }
};