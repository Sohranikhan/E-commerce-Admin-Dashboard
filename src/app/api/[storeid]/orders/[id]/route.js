import Order from "@/models/Order"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
    const {id} = params
try {
    if (id) {
        const color = await Order.findOne({_id: id}).populate({
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
            color
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