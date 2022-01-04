
export default class Sum {
    public _id: string;
    public number1: number;
    public number2: number;
    public status: string;
    public result: number;

    constructor(_object?: any) {
        this._id = _object.id;
        this.number1 = _object.number1;
        this.number2 = _object.number2;
        this.status = _object.status || "Pending";
        this.result = _object.result || null;
    }
}