import Size from "@/models/Size"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const GET = async(request, searchParams)=>{
  await connectDB();
  const {params} = searchParams;
  const storeId = params.storeid;
try {
    if (storeId) {
        const size = await Size.find({storeId})
        return NextResponse.json({
            success: true,
            size
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
export const POST = async(request)=>{
    const {id} = await request.json()
    await connectDB()
  try {
    const size = await Size.find({ storeid: id })
    if (size) {
      return NextResponse.json({
        success: true,
        size
      })
    }
    return NextResponse.json({
      success: false,
      message: "Something went wrong"
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}