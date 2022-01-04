import mongoose from 'mongoose';
export default class SumMongoose {

    private schema: mongoose.Schema;
    private model: mongoose.Model<mongoose.Document>;
    constructor() {
        
        this.schema = new mongoose.Schema({
            number1: Number,
            number2: Number,
            status: String,
            result: Number
        }, { autoCreate: true });

        this.model = mongoose.model('Sum', this.schema, 'Sum');
    }
    public getModel() {
        return this.model;
    }
}