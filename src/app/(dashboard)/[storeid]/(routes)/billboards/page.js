import { deleteBillboard } from "@/actions/storeAction"
import Headings from "@/components/Headings/Headings"
import Billboard from "@/models/Billboard"
import connectDB from "@/utils/connectDB"
import Table from "./components/Table"
import Link from "next/link"
import {FaBug, FaPlus} from "react-icons/fa"
import HeadingMed from "@/components/HeadingMed/HeadingMed"
import ApiProvider from "@/components/ApiProvider/ApiProvider"
import { Suspense } from "react/"

const getBillboards = async(id)=>{
await connectDB()
    try {
        const billboards = await Billboard.find({storeId: id}).sort({createdAt: -1})
        if (billboards) {
            return{
                success: true,
                billboards
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
        title: "Billboards",
        description: "Billboards for your store categories"
    }
  }
const Billboards = async({params}) => {
const {storeid} = params
const data = await getBillboards(storeid)
  if (data.success) {
    return (
        <div className="w-full flex flex-col gap-y-2 sm:p-6 p-3">
        <div className="w-full flex items-start justify-between">
        <Headings title={`Billboards (${data.billboards.length})`} des={'Billboards for your store categories'} />
          <Link href={`/${storeid}/billboards/new`} className="btn btn-primary px-2 py-0 flex"><FaPlus /> Add New</Link>
        </div>
        <Suspense>
<div className="w-full h-auto">
  <Table data={data.billboards} storeId={`${storeid}`} callback={'billboards'} deleteItem={deleteBillboard} />
</div>
        </Suspense>
<div className="w-full flex flex-col gap-1 overflow-scroll scrollbarnone">
<HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/billboards`} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/billboards/{billboard-Id}`} />
</div>
      </div>
      )
  }
}

export default Billboards