import mongoose,{Schema} from "mongoose"
const UserModel = Schema({
    name: String,
    email: String,
    password: String,
    stores: [{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]
},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', UserModel)
export default User