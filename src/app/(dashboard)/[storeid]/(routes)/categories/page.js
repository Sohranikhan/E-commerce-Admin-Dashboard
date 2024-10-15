import Headings from "@/components/Headings/Headings"
import Category from "@/models/Category"
import connectDB from "@/utils/connectDB"
import Table from "./components/Table"
import Link from "next/link"
import {FaBug, FaPlus} from "react-icons/fa"
import { deleteCategory } from "@/actions/storeAction"
import HeadingMed from "@/components/HeadingMed/HeadingMed"
import ApiProvider from "@/components/ApiProvider/ApiProvider"
import { Suspense } from "react"

const getCategories = async(id)=>{
  await connectDB()
      try {
          const categories = await Category.find({storeId: id}).populate({
            path: 'billboardId',
            model: 'Billboard',
            select: ['label', '-_id']
          }).populate({
            path: 'products',
            model: 'Product'
          }).sort({createdAt: -1})
          if (categories) {
              return{
                  success: true,
                  categories
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

  export async function generateMetadata() {
    return {
        title: "Categories",
        description: "Categories of your store"
    }
  }
  
const Categories = async({params}) => {
  const {storeid} = params
  const data = await getCategories(storeid)
  if (data.success) {
  return (
    <div className="w-full h-full flex flex-col gap-y-2 sm:p-6 p-3">
      <div className="w-full flex items-start justify-between">
      <Headings title={`Categories (${data.categories.length})`} des={'Categories of your store'} />
        <Link href={`/${storeid}/categories/new`} className="btn btn-primary px-2 py-0 flex"><FaPlus /> Add New</Link>
      </div>
      <Suspense>

<div className="w-full h-auto flex items-center justify-center min-h-max bg-gray-700 overflow-x-scroll overflow-y-auto">
<Table data={data.categories} storeId={`${storeid}`} callback={'categories'} deleteItem={deleteCategory} />
</div>
      </Suspense>
<div className="flex flex-col gap-1 overflow-scroll scrollbarnone">
<HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/categories`} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/categories/{category-Id}`} />
</div>
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

export default Categories