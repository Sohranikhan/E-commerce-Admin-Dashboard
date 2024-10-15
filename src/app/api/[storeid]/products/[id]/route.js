import Color from "@/models/Colors";
import Product from "@/models/Product"
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const newUrl = new URL(request.url)
    const colorId = newUrl.searchParams.get('colorId') || undefined;
    const sizeId = newUrl.searchParams.get('sizeId') || undefined;
    const categoryId = newUrl.searchParams.get('categoryId') || undefined;

    const {params} = searchParams
    const {id, storeid} = params
try {
    if (id) {
        const product = await Product.findOne({_id: id}).populate({
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
        }).sort({price : -1})
        const relatedProducts = await Product.find({$or: [{colorId},{sizeId},{categoryId:{$eq: categoryId}}],$and:[{storeId: storeid},{_id:{$ne: product._id}},{categoryId:{$eq: categoryId}}]}).populate({
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
        }).sort({price : -1})

        return NextResponse.json({
            success: true,
            product,
            relatedProducts
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