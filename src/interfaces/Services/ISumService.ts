import Sum from "../../classes/sum";

export default interface ISumService {
    saveNumbersToSum(): Promise<Sum>
}