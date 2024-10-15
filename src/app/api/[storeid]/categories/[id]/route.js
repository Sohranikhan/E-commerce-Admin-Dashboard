import Category from "@/models/Category"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams
    const {id} = params
try {
    if (id) {
        const category = await Category.findOne({_id: id},{name: 1}).populate({
            path: 'products',
            model: 'Product',
            select: ['name','image','price','featured','reviews']
        })
        return NextResponse.json({
            success: true,
            category
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