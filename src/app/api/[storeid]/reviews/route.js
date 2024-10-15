import Review from "@/models/Review";
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const GET = async(request, searchParams)=>{
    await connectDB();
const params = request.nextUrl.searchParams;
const productId = params.get('productId');
const {params: sParams} = searchParams;
const storeId = sParams.storeid;
try {
    if (storeId) {
        const reviews = await Review.find({productId},{rating: 1, _id: -1, comment: 1})
        return NextResponse.json({
            success: true,
            reviews
        })
    } else {
        return NextResponse.json({
            success: false,
            message: 'Provide A valid Product/Store ID'
            })      
    }
} catch (error) {
    return NextResponse.json({
        success: false,
        message: error.message
        })   
}
}