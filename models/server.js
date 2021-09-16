const express = require('express');
const db = require('../database/connection');
class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conexion a database
        this.dbConnection();
        // Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Base de datos online');
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares() {
        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.authPath , require('../routes/auth'));

        this.app.use( this.usuariosPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        } )
    }


}

module.exports = Server