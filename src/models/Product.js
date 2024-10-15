import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: String,
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    price: Number,
    featured: Boolean,
    sizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Size' },
    colorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Size' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    reviews: [{type: mongoose.Types.ObjectId, ref: 'Review'}]
  },{timestamps: true});

  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
  export default Product