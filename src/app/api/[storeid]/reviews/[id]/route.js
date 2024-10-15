import Review from "@/models/Review"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
    const {id} = params
try {
    if (id) {
        const reviews = await Review.find({productId},{rating: 1, _id: -1, comment: 1})
        return NextResponse.json({
            success: true,
            reviews
        })
    } else {
        return NextResponse.json({
            success: false,
            message: 'Provide A valid API URL'
            })      
    }
} catch (error) {
    return NextResponse.json({
        success: false,
        message: error.message
        })   
}
}