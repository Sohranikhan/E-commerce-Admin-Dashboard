import mongoose from "mongoose";

const StoreSchema = mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    size: [{type: mongoose.Schema.Types.ObjectId, ref: 'Size'}],
    colors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Color'}],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    billboards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Billboard' }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },{timestamps: true});

const Store = mongoose.models?.Store || mongoose.model('Store', StoreSchema)
export default Store