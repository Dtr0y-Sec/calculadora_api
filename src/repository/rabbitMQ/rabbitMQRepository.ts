import amqp from 'amqplib';
import { rabbitmqConnectionString } from '../../config/config';
import { RabbitMQQueueEnum } from '../../enum/rabbitMQQueueEnum';

export default class RabbitMQRepository {

    public async enqueueMessage(_queue: RabbitMQQueueEnum, _message: string) : Promise<boolean> {

        let amqpConnection: any;

        try {
            amqpConnection = await amqp.connect(rabbitmqConnectionString);
            let channel: any = await amqpConnection.createChannel();
            return await channel.sendToQueue(_queue, Buffer.from(_message));
        }
        catch (err) {
            throw err;
        }
        finally {
            setTimeout(() => amqpConnection.close(), 5000);
        }

    }
}