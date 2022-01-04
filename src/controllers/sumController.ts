import * as express from 'express';
import Sum from '../classes/sum';
import ISumRepository from '../interfaces/Services/ISumService';
import { SumRepository } from '../repository/mongoDB/sumRepository';
import { SumService } from '../services/sumService';

export default class sumController {

    public async saveNumbersToSum(_request: express.Request, _response: express.Response) {
        try {

            let sumObject: Sum = new Sum(_request.body);

            if (!sumObject.number1) {
                throw new Error("[number1] is required");
            }

            if (!sumObject.number2) {
                throw new Error("[number2] is required");
            }

            let sumService = new SumService(new SumRepository());

            let response = await sumService.saveNumbersToSum(sumObject);

            _response.status(200).json(response);

        }
        catch (err: any) {
            _response.status(400).json(err.toString());
        }
    }

    public async getSumById(_request: express.Request, _response: express.Response) {
        try {

            let _id: string = _request.params._id;

            if (!_id) {
                throw new Error("[_id] is required");
            }

            let sumService = new SumService(new SumRepository());

            let response = await sumService.getSumById(_id);

            if (response._id == null) {
                return _response.status(404).json("_Id not found");
            }

            _response.status(200).json(response);

        }
        catch (err: any) {
            _response.status(400).json(err.toString());
        }
    }
}