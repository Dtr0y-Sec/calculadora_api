import { mongodbConnectionString } from '../config/config';
import mongoose from 'mongoose';

import SumMongoose from '../models/sumModel';

export default class MongoDB {

    private connectionString: string;

    constructor() {
        this.connectionString = mongodbConnectionString;
    }

    //Exporta as models das collections do mongo
    public static Sum: mongoose.Model<mongoose.Document>;
    // public static UserAuth: mongoose.Model<mongoose.Document>;

    public initializeMongoDB() {
        this.initializeMongoEventHandler();
        this.connectMongo();
        this.configureModels();
    }

    private initializeMongoEventHandler() {

        mongoose.connection.on('connecting', () => console.log(` MongoDB ----------------> Connecting`));
        mongoose.connection.on('connected', () => console.log(` MongoDB ----------------> Connection successfully`));
        mongoose.connection.on('open', () => console.log(` MongoDB ----------------> Connection open`));
        mongoose.connection.on('reconnected', () => console.log(` MongoDB ----------------> Reconnecting`));
        mongoose.connection.on('disconnected', () => console.log(` MongoDB ----------------> Disconnected`));
        mongoose.connection.on('error', (error: any) => console.log(` MongoDB ----------------> Connection to mongo failed. Errors: [${error}]`));

        process.on('SIGINT', () => {
            mongoose.connection.close(() => console.log(` MongoDB ----------------> Disconnecting by finishing application`));
            process.exit(0);
        });
    }

    private connectMongo() {
        try {
            mongoose.connect(this.connectionString);
        }
        catch (err: any) {
            console.log(` MongoDB ----------------> Connection failed. Errors:[${err.toString()}]`);
            console.log(` MongoDB ----------------> Initializing reconnection process in 5 seconds`);
            setTimeout(this.connectMongo, 5000);
        }
    }

    private configureModels() {
        MongoDB.Sum = new SumMongoose().getModel();
    }
}