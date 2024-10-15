import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
    name: String,
    value: String,
    storeId:{
        type: mongoose.Types.ObjectId,
        ref: 'Store'
    }
},{timestamps: true});

const Size = mongoose.models.Size || mongoose.model('Size', sizeSchema)
export default Size