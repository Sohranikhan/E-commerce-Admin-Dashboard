import Billboard from "@/models/Billboard"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
// const param = request.nextUrl.searchParams;
// const storeId = params.get('storeId');
const {storeid: storeId} = params
try {
    if (storeId) {
        const billboards = await Billboard.find({storeId: storeId})
        return NextResponse.json({
            success: true,
            billboards
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