import Headings from "@/components/Headings/Headings"
import Table from "./components/Table.jsx"
import Size from "@/models/Size"
import connectDB from "@/utils/connectDB"
import {deleteSize} from "@/actions/storeAction"
import Link from "next/link"
import {FaBug, FaPlus} from "react-icons/fa"
import HeadingMed from "@/components/HeadingMed/HeadingMed.jsx"
import ApiProvider from "@/components/ApiProvider/ApiProvider.jsx"
import { Suspense } from "react"

const getSize = async (id) => {
  await connectDB()
  try {
    const size = await Size.find({ storeId: id }).sort({createdAt: -1})
    if (size) {
      return {
        success: true,
        size
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
    title: "Size",
    description: "Size of your store"
  }
}

const SizePage = async ({ params }) => {

  const { storeid } = params
  const data = await getSize(storeid)
  if (data.success) {
    return (
      <div className="w-full flex flex-col gap-y-2 sm:p-6 p-3">
        <div className="w-full flex items-start justify-between">
          <Headings title={`Size (${data.size.length})`}
            des='Size of your store' />
          <Link href={`/${storeid}/size/new`} className="btn btn-primary px-2 py-0 flex"><FaPlus /> Add New</Link>
        </div>
        <Suspense>
<div className="w-full h-auto">
  
  <Table data={data.size} storeId={`${storeid}`} callback={'size'} deleteItem={deleteSize} />
</div>
        </Suspense>
<div className="flex flex-col gap-1 overflow-scroll scrollbarnone">
<HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/size`} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/size/{size-Id}`} />
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

export default SizePage