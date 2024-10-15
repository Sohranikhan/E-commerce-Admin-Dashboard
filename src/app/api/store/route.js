import Billboard from "@/models/Billboard"
import Category from "@/models/Category"
import Color from "@/models/Colors"
import Image from "@/models/Image"
import Product from "@/models/Product"
import Review from "@/models/Review"
import Store from "@/models/Store"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request) => {
  const session =  request.cookies.get('session')?.value
  await connectDB()
  try {
    if (!session) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Please Login"
      })      
    } 
    const user = JSON.parse(session)
      const data = await Store.find({ owner: user.id },{name: 1})
      if (data) {
        return NextResponse.json({
          success: true,
          data
        })
      } else {
        return NextResponse.json({
          success: false,
          message: "Something went wrong"
        })
      }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}

export const DELETE = async(request)=>{
  const session =  request.cookies.get('session')?.value
  const {id} = await request.json();
  await connectDB()
  try {
    if (!session) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Please Login"
      })      
    } 
    const user = JSON.parse(session)
    const data = await Store.findOne({ owner: user.id })
      if (data?.products?.length < 1 && data?.orders?.length < 1 && data?.categories?.length < 1) {
        await Billboard.deleteMany({storeId: id})
        await Color.deleteMany({storeId: id})
        await Image.deleteMany({storeId: id})
        await Size.deleteMany({storeId: id})
        await Review.deleteMany({storeId: id})

        await Store.deleteOne({_id: id})
        return NextResponse.json({
          success: true,
          message: "Successfully Deleted"
        })
      } else {
        return NextResponse.json({
          success: false,
          message: "Please Remove All Products,Categories and Orders First"
        })
      }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}