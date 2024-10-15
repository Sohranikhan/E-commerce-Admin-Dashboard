import Size from "@/models/Size"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
    const {id} = params
try {
    if (id) {
        const color = await Size.findOne({_id: id},{name: 1, value: 1})
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