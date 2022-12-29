const { createConnection } = require("mysql2")

class MysqlService {
    connection
    constructor () { 
        // create the connection to database
        this.connection = createConnection({
            host: 'localhost',
            user: 'root',
            database: 'delilah_resto',
            port: 3306
        })
    }
    storeUser (...attr) {
        this.connection.query('I')
    }
}
module.exports = MysqlService