import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    comment: String
  },{timestamps: true});

  const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
  export default Review