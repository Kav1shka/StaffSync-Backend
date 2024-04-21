const {Pool}=require('pg')

const pool=new Pool({
    
connectionString: 'postgres://dvdwwsrc:RsE5uaSxoRP0RNXQYfX2f_ef6cK4gWAv@bubble.db.elephantsql.com/dvdwwsrc'

})

pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports={
    pool
};