import Sum from "../classes/sum";
import ISumRepository from "../interfaces/Repository/ISumRepository";
import RabbitMQRepository from "../repository/rabbitMQ/rabbitMQRepository";
import { RabbitMQQueueEnum } from '../enum/rabbitMQQueueEnum';

export class SumService {

    constructor(private sumRepository: ISumRepository) {

    }

    public async saveNumbersToSum(_sumObject: Sum) {
        try {

            let sumObject: Sum = await this.sumRepository.saveNumbersToSum(_sumObject);

            if (!sumObject._id) {
                throw new Error("Error while creating document on database");
            }

            let serializedBody: string = JSON.stringify({ _Id: sumObject._id });
            let rabbitMQRepository: RabbitMQRepository = new RabbitMQRepository();
            
            await rabbitMQRepository.enqueueMessage(RabbitMQQueueEnum.SumOperationQueue, serializedBody);

            return sumObject;

        }
        catch (err) {
            throw err;
        }
    }

    public async getSumById(_id: string) {
        try {

            let query: any = {
                _id: _id
            };

            return await this.sumRepository.getSumById(query);

        }
        catch (err) {
            throw err;
        }
    }

}