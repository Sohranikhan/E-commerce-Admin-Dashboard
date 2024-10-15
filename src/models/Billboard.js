import mongoose from "mongoose"

const billboardSchema = mongoose.Schema({
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    label: String,
    imageUrl: String,
    categories: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
    }]
},{timestamps: true})

const Billboard = mongoose.models.Billboard || mongoose.model('Billboard', billboardSchema)
export default Billboard
