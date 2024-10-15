import DeleteStore from "@/components/DeleteStore/DeleteStore"
import Headings from "@/components/Headings/Headings"
import Store from "@/models/Store"
import connectDB from "@/utils/connectDB"
import {FaBug} from "react-icons/fa"

import Color from "@/models/Colors"
import Category from "@/models/Category"
import Size from "@/models/Size"
import Billboard from "@/models/Billboard"
import Order from "@/models/Order"
import Image from "@/models/Image"
import Product from "@/models/Product"
import Review from "@/models/Review"


const getStore = async(id)=>{
await connectDB()
    try {
        const store = await Store.findOne({_id: id})
        if (store) {
            return{
                success: true,
                store
            }  
        }
        return{
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

const page = async({params}) => {
    
    const {storeid} = params
        const data = await getStore(storeid)
        if (data.success) {
          return (
              <div className="w-full h-auto sm:m-6 m-3">
                  <div className="flex items-center justify-between">
          <Headings title={'Dashboard'} des={'Overview of your store sales'} />
          <DeleteStore storeId={`${storeid}`} />
                  </div>
          <h1>{data.store.name}</h1>
              </div>
            )
        }else{
            return(
                <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:m-6 m-3">
                  <div className="flex flex-col items-center justify-center gap-2">
                  <FaBug />
                  <p>{data.message}</p>
                  </div>
                </div>
            )
        }  
}

export default page