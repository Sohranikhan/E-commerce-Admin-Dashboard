import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    url: String,
    storeId:{
        type: mongoose.Types.ObjectId,
        ref: 'Store'
    },
    productId:{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }
},{timestamps: true});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema)
export default Image