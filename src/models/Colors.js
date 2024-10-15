import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
    name: String,
    value: String,
    storeId:{
        type: mongoose.Types.ObjectId,
        ref: 'Store'
    }
},{timestamps: true});

const Color = mongoose.models.Color || mongoose.model('Color', colorSchema)
export default Color