import Headings from "@/components/Headings/Headings"
import Table from "./components/Table.jsx"
import Color from "@/models/Colors"
import connectDB from "@/utils/connectDB"
import { deleteColor } from "@/actions/storeAction"
import Link from "next/link"
import { FaBug, FaPlus } from "react-icons/fa"
import HeadingMed from "@/components/HeadingMed/HeadingMed.jsx"
import ApiProvider from "@/components/ApiProvider/ApiProvider.jsx"
import { Suspense } from "react"

const getColors = async (id) => {
  await connectDB()
  try {
    const colors = await Color.find({ storeId: id }).sort({ createdAt: -1 })
    if (colors) {
      return {
        success: true,
        colors
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
    title: "Color",
    description: "Color of your store"
  }
}
// searchParams
// output: { id: '121', name: 'amir' } from color
const ColorsPage = async ({ params }) => {
  const { storeid } = params
  const data = await getColors(storeid)
  if (data.success) {
    return (
      <div className="w-full flex flex-col gap-y-2 sm:p-6 p-3">
        <div className="w-full flex items-start justify-between">
          <Headings title={`Colors (${data.colors.length})`} des={'Colors of your store'} />
          <Link href={`/${storeid}/colors/new`} className="btn btn-primary px-2 py-0 flex"><FaPlus /> Add New</Link>
        </div>
        <Suspense>
          <div className="w-full h-auto">
            <Table data={data.colors} storeId={`${storeid}`} callback={'colors'} deleteItem={deleteColor} />
          </div>
        </Suspense>
        <div className="flex flex-col gap-1 overflow-scroll scrollbarnone">
          <HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
          <ApiProvider path={`http://localhost:3000/api/${storeid}/colors`} />
          <ApiProvider path={`http://localhost:3000/api/${storeid}/colors/{color-Id}`} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:m-6 m-3">
        <div className="flex flex-col items-center justify-center gap-2">
          <FaBug />
          <p>{data.message}</p>
        </div>
      </div>
    )
  }
}

export default ColorsPage