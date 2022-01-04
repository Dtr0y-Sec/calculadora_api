import MongoDB from "../database/mongoConnect";
import Routes from "../routes/routes";
import express from "express";
import morgan from "morgan";

export default class App {
    private app: express.Express;
    private mongodb: MongoDB;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan("[:date[iso]] :method :url in :response-time ms")); //Middleware de logs
        this.app.use('/api', new Routes().getRoutes());
        this.startMongoDb();
    }

    public getApp(): express.Express {
        return this.app
    }

    public setApp(key: string, value: any): void {
        this.app.set(key, value);
    }

    private startMongoDb() {
        this.mongodb = new MongoDB();
        this.mongodb.initializeMongoDB();
    }
}