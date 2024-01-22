module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "digitalbooks_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
<<<<<<< HEAD
    "username": "root",
    "password": null,
    "database": "digitalbooks_db",
    "host": "127.0.0.1",
=======
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
>>>>>>> 15617949f9fde5736735aaa26d1e20ebc9fb7a24
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
