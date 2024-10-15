import Order from "@/models/Order"
import Headings from "@/components/Headings/Headings"
import Table from "./components/Table.jsx"
import connectDB from "@/utils/connectDB"
import {FaBug} from "react-icons/fa"
import HeadingMed from "@/components/HeadingMed/HeadingMed.jsx"
import ApiProvider from "@/components/ApiProvider/ApiProvider.jsx"
import { Suspense } from "react"

const OrdersPage = async({params}) => {
  const { storeid } = params
  const getOrder = async (id) => {
    await connectDB()
    try {
      const order = await Order.find({ storeId: id }).sort({updatedAt: -1})
      if (order) {
        return {
          success: true,
          order
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
  const data = await getOrder(storeid)
  if (data.success) {
    return (
      <div className="w-full flex flex-col gap-y-2 sm:p-6 p-3">
        <div className="w-full flex items-start justify-between">
          <Headings title={`Orders (${data.order.length})`}
            des='Orders of your store' />
        </div>
        <Suspense>
<div className="w-full h-auto">
  <Table data={data.order} storeId={`${storeid}`} callback={'orders'} />
</div>
        </Suspense>
<div className="flex flex-col gap-1 overflow-scroll scrollbarnone">
<HeadingMed title={'Public API Routes'} des={'You can access whole data on client-side'} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/orders`} />
<ApiProvider path={`http://localhost:3000/api/${storeid}/orders/{order-Id}`} />

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

export default OrdersPage