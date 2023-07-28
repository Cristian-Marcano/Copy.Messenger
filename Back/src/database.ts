import mysql from 'promise-mysql';
import db from './key';

const pool = mysql.createPool(db.database);

pool.getConnection()
    .then(connection=>{
        pool.releaseConnection(connection);
        console.log('DB is connected');
    });

export default pool;