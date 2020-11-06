const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, "../.env") });
exports.CrudServer = class {
    constructor() {
        this.app = null
    }
    start() {
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandler();
        this.startListening();
    }
    initServer() {
        this.app = express()
    }
    initMiddlewares() {
        this.app.use(express.json())
        this.app.use(morgan('tiny'))
    }
    initRoutes() {

    }
    initErrorHandler() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500
            return res.status(statusCode).send(err.message)
        })
    }
    startListening() {
        const { PORT } = process.env
        this.app.listen(PORT, () => {
            console.log("Server started at port ", PORT);
        })
    }
}