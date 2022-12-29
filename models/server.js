const express = require('express');
const db = require('../database/connection');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            pedidos: '/api/pedidos',
        };

        // Conexión a database
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
        const swaggerDocument = YAML.load('./docs/spec.yml')
        this.app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        this.app.use( this.paths.auth , require('../routes/auth'));
        this.app.use( this.paths.usuarios , require('../routes/usuarios'));
        this.app.use( this.paths.productos , require('../routes/productos'));
        this.app.use( this.paths.pedidos , require('../routes/pedidos'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port )
        } )
    }
}

module.exports = Server