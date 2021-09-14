const express = require('express')

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';


        // Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use( express.json() );


    }

    routes() {

        this.app.use( this.usuariosPath , require('../routes/usuarios'))

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        } )
    }


}

module.exports = Server