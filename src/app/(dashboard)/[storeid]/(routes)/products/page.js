import Product from "@/models/Product"
import Headings from "@/components/Headings/Headings"
import Table from "./Components/Table"
import connectDB from "@/utils/connectDB"
import {deleteProduct} from "@/actions/storeAction"
import Link from "next/link"
import {FaBug, FaPlus} from "react-icons/fa"
import HeadingMed from "@/components/HeadingMed/HeadingMed"
import ApiProvider from "@/components/ApiProvider/ApiProvider"
import { Suspense } from "react"


const getProduct = async (id) => {
  await connectDB()
  try {
    const products = await Product.find({ storeId: id }).populate({
      path: 'sizeId',
      model: 'Size'
    }).populate({
      path:'colorId',
      model: 'Color'
    }).populate({
      path:'categoryId',
      model: 'Category'
    }).sort({updatedAt: -1})
    if (products) {
      return {
        success: true,
        products
      }
    }
    return {
      success: false,
      message: "Something went wrong"
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}


export async function generateMetadata() {
  return {
    title: "Product",
    description: "Product of your store"
  }
}



const ProductPage = async ({ params }) => {
  const { storeid } = params
  const data = await getProduct(storeid)
  if (data.success) {
    return (
      <div className="w-full flex flex-col gap-y-2 sm:p-6 p-3">
        <div className="w-full flex items-start justify-between">
          <Headings title={`Products (${data.products.length})`}
            des='Products of your store' />
          <Link href={`/${storeid}/products/new`} className="btn btn-primary px-2 py-0 flex"><FaPlus /> Add New</Link>
        </div>
        <Suspense>
<div className="w-full h-auto">
  <Table data={data.products} storeId={`${storeid}`} callback={'products'} deleteItem={deleteProduct} />
</div>
        </Suspense>
<div className="flex flex-col gap-1 overflow-scroll scrollbarnone">
<HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/products`} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/products/{product-Id}`} />

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

export default ProductPage