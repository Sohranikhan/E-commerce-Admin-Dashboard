import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: String,
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    billboardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Billboard'},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },{timestamps: true});

  const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)
  export default Category