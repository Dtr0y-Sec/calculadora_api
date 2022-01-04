import Sum from "../../classes/sum";

export default interface ISumRepository {
    saveNumbersToSum(sumObject: Sum): Promise<Sum>;
    getSumById(query: any): Promise<Sum>;
}