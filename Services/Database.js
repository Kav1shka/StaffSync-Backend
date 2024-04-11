const {Pool}=require('pg')

const pool=new Pool({
    
connectionString: 'postgres://dvdwwsrc:RsE5uaSxoRP0RNXQYfX2f_ef6cK4gWAv@bubble.db.elephantsql.com/dvdwwsrc'

})

module.exports={
    pool
};