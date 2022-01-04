import * as express from "express";
import SumController from "../controllers/sumController";

/* Classe de gerenciamento das rotas */
export default class Routes {

    constructor() {
    }

    public getRoutes(): express.Router {

        let route: express.Router = express.Router();

        let sumController = new SumController();

        // Health Check
        route.get('/status', (req, res) => {
            res.send("Aplicação online");
        });

        route.post('/sum/save', sumController.saveNumbersToSum);
        route.get('/sum/getById/:_id', sumController.getSumById);

        return route;
    }
}