import Category from "@/models/Category"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
const {params} = searchParams;
const storeId = params.storeid;
try {
    if (storeId) {
        const category = await Category.find({storeId},{name: 1}).populate({
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