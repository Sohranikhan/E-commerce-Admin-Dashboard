import Order from "@/models/Order";
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const GET = async(request, searchParams)=>{
await connectDB();
const {params} = searchParams;
const storeId = params.storeid;
try {
    if (storeId) {
        const orders = await Order.find({storeId}).populate({
            path: 'products',
            model: 'Product',
            select: ['name','price'],
            populate:{
                path: 'images',
                model: 'Image'
            }
        })
        return NextResponse.json({
            success: true,
            orders
        })
    } else {
        return NextResponse.json({
            success: false,
            message: 'Provide A valid Store ID'
            })      
    }
} catch (error) {
    return NextResponse.json({
        success: false,
        message: error.message
        })   
}
}