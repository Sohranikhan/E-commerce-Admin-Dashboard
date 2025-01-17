import Link from "next/link"
import { FaEdit } from "react-icons/fa"
import { FiMoreVertical, FiPlus } from "react-icons/fi"
import Input from "@/components/Input/Input"
import FormNew from "@/components/FormNew/FormNew"
import CopyLi from "@/components/CopyLi/CopyLi"
import DateFormate from "@/components/DateFormate/DateFormate"
import Category from "@/models/Category"
import Product from "@/models/Product"


const deletePro = async(formData)=>{
    "use server"
    const proId = formData.get('proid')
    const catId = formData.get('catid')
    try {
       const up = await Category.updateOne({_id: catId},{$pull:{products: proId}})
       await Product.updateOne({_id: proId},{$set:{categoryId: null}})
       if (up) {
           return {
               success: true,
               message: 'Successfully Deleted'
              }
        }
        return {
            success: false,
            message: 'Database error'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

const Table = ({ data, storeId, deleteItem, callback }) => {
    if (data.length > 0) {
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Billboard</th>
                            <th>Date</th>
                            <th>Options</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={`${item._id}`}>
                                <th>{index}</th>
                                <td>{item.name}</td>
                                <td>{item?.billboardId?.label || null}</td>
                                <DateFormate date={`${item.createdAt}`} />
                                <td>
                                    <div className="dropdown dropdown-hover dropdown-left cartBtn h-full flex items-center cursor-pointer rounded-sm mx-2">
                                        <div tabIndex={0} role='button'><FiMoreVertical /></div>
                                        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                                            <li><Link href={`/${storeId}/${callback}/${item._id}`}><FaEdit /> Edit</Link></li>
                                            <CopyLi value={item.value} />
                                            <li>
                                                <FormNew subAction={deleteItem} callback={`/${storeId}/${callback}`} className={'w-full flex items-center justify-start bg-transparent border-none hover:bg-transparent'} btntitle={'Delete'}>
                                                    <Input name={'itemid'} hidden={true} defaultval={`${item._id}`} />
                                                    <Input name={'storeid'} hidden={true} defaultval={`${storeId}`} />
                                                </FormNew></li>
                                        </ul>
                                    </div>
                                </td>

                                <td>
                                    <div className="dropdown dropdown-hover dropdown-left cartBtn h-full flex items-center cursor-pointer rounded-sm mx-2">
                                        <div tabIndex={0} role='button' className="flex items-center gap-1"><FiPlus /> Products</div>
                                        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                                            {item?.products && item?.products?.map((product)=>(
                                                <li key={`${product._id}`}>
                                                <FormNew btntitle={'X'} callback={`/${storeId}/${callback}`} subAction={deletePro}  className={'w-fit mx-auto flex flex-row items-center justify-between bg-primary border-none'}>
                                                <p>{product?.name}</p>
                                                <Input name={'proid'} hidden={true} defaultval={`${product?._id}`} />
                                                <Input name={'catid'} hidden={true} defaultval={`${item?._id}`} />
                                                    </FormNew> </li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </>
        )
    } else {
        return (
            <div className=" w-full">

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                </table>
                <p className="my-7 mx-2">No Data Found </p>
            </div>
        )
    }
}

export default Table