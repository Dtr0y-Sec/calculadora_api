import Sum from '../../classes/sum';
import ISumRepository from '../../interfaces/Repository/ISumRepository';
import MongoDB from '../../database/mongoConnect';

export class SumRepository implements ISumRepository {
    public async saveNumbersToSum(sumObject: Sum) {

        return new Promise<Sum>((resolve, reject) => {
            try {

                MongoDB.Sum.create(sumObject, (err: any, resp: any) => {

                    if (err) {
                        throw err;
                    }

                    resolve(new Sum(resp));

                });

            }
            catch (error) {
                reject(error);
            }
        });

    }

    public async getSumById(query: any) {

        return new Promise<Sum>((resolve, reject) => {
            try {

                MongoDB.Sum.findOne(query, (err: any, resp: any) => {

                    if (err) {
                        throw err;
                    }

                    resolve(new Sum(resp ? resp : {}));

                });

            }
            catch (error) {
                reject(error);
            }
        });

    }
}