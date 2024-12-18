require("dotenv").config({ path: `${process.cwd()}/.env`});

module.exports={
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    seederStorage: 'sequelize',
  }

  // module.exports={
//     pool,
//     DB: 'thiwnhco',
//     USER: 'thiwnhco',
//     PASSWORD: '3W4zNPIDTmLuB_pjTUymvz0HW_BbIMqE',
//     HOST: 'kala.db.elephantsql.com',
//     dialect: 'postgres',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// };
  // ,
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }
}
