import * as config from '../config/config';
import * as http from 'http';
import App from './app';

require('dotenv').config();

export default class Server {

    public static serverName: string;
    public static enviroment: string;   
    public static port: number;

    app: App;

    constructor(_app: App) {

        Server.serverName = config.serverName;
        Server.enviroment = config.enviroment;
        Server.port = config.port;

        this.app = _app;
        this.app.setApp('port', Server.port);
    }

    public start() {

        let server: http.Server = http.createServer(this.app.getApp());
        server.listen(Server.port);
        server.on('error', this.onErrorHandler);
        server.on('listening', this.onListeningHandler);
    }

    private onErrorHandler(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind: any;
        if (typeof Server.port === 'string') {
            bind = 'Pipe ' + Server.port;
        }
        else {
            bind = 'Port ' + Server.port;
        }

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requer privilégios elevados');
                process.exit(1);
            case 'EADDRINUSE':
                console.error(bind + ' [PORTA] já está em uso');
                process.exit(1);
            default:
                throw error;
        }
    }

    private onListeningHandler() {

        console.log(` Projeto ----------------> Calculadora`);
        console.log(` Aplicação --------------> ${Server.serverName}`);
        console.log(` Status da aplicação ----> ONLINE`);
        console.log(` Porta ------------------> ${Server.port}`);
        console.log(` Rota -------------------> /api`);
        console.log(` Ambiente ---------------> ${Server.enviroment} `);
    }
}