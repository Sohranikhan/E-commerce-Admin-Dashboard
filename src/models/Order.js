import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled']
    }
  },{timestamps: true});

  const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
  export default Order