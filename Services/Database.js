// const {Pool}=require('pg')

// const pool=new Pool({

//   connectionString: 'postgres://thiwnhco:3W4zNPIDTmLuB_pjTUymvz0HW_BbIMqE@kala.db.elephantsql.com/thiwnhco',
//   max: 5,
//   min: 0,
//   acquire: 30000,
//   idle: 10000,


// })

// pool.connect((err, client, done) => {
//     if (err) {
//       console.error('Error connecting to the database', err);
//     } else {
//       console.log('Connected to the database');
//     }
//   });

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

// // const{Client}=require('pg');

// // const client=new Client({
// //   host:"localhost",
// //   user:"postgres",
// //   port:"5432",
// //   password:"123",
// //   database:"StaffSyncDB"
// // })

// // client.connect();
