import Billboard from "@/models/Billboard"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
    const {id} = params
try {
    if (id) {
        const billboard = await Billboard.findOne({_id: id})
        return NextResponse.json({
            success: true,
            billboard
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