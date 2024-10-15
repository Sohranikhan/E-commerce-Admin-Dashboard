import Store from "@/models/Store";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    const {params} = searchParams;
    const storeId = params.storeid;
    try {
        const storeData = await Store.findOne({_id: storeId},{name: 1, description: 1, createdAt: 1})
        return NextResponse.json({
            success: true,
            storeData
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}