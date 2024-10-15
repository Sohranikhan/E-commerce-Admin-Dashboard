import Color from "@/models/Colors"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams;
    const storeId = params.storeid;
try {
    if (storeId) {
        const colors = await Color.find({storeId})
        return NextResponse.json({
            success: true,
            colors
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