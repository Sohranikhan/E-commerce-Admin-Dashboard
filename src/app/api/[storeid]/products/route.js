import { NextResponse } from "next/server";
import Billboard from "@/models/Billboard"
import Category from "@/models/Category"
import Color from "@/models/Colors"
import Product from "@/models/Product"
import Size from "@/models/Size"
import Review from "@/models/Review"
import Order from "@/models/Order"
import Image from "@/models/Image"
import connectDB from "@/utils/connectDB";

export const GET = async(request, searchParams)=>{
await connectDB()
const {params} = searchParams;
const storeId = params.storeid;
try {
    if (storeId) {
        const product = await Product.find({storeId}).populate({
            path: 'sizeId',
            model: 'Size',
            select: ['name', 'value']
        }).populate({
            path: 'colorId',
            model: 'Color',
            select: ['name', 'value']
        }).populate({
            path: 'categoryId',
            model: 'Category',
            select: ['name']
        }).populate({
            path: 'reviews',
            model: 'Review'
        }).populate({
            path: 'images',
            model: 'Image',
            select: ['url']
        }).sort({name : 1})
        return NextResponse.json({
            success: true,
            product
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