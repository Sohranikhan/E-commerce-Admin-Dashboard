import Store from "@/models/Store"
import Billboard from "@/models/Billboard"
import Category from "@/models/Category"
import Color from "@/models/Colors"
import Product from "@/models/Product"
import Size from "@/models/Size"
import Review from "@/models/Review"
import Order from "@/models/Order"
import Image from "@/models/Image"
import connectDB from "./connectDB"

const fetchStore = async(storeId)=>{
    await connectDB();
    try {
    const storeData = await Store.findOne({_id: storeId}).populate({
        path: 'size',
        model: 'Size'
    }).populate({
        path: 'colors',
        model: 'Color'
    }).populate({
        path: 'categories',
        model: 'Category'
    }).populate({
        path: 'billboards',
        model: 'Billboard'
    }).populate({
        path: 'products',
        model: 'Product'
    })
    if (storeData) {
        return{
            success: true,
            data: storeData
        }
    } else {
        return{
            success: false,
            message: "Database Error"
        }
    }
        } catch (error) {
            return{
                success: false,
                message: error.message
            }
        }
    }

    export default fetchStore