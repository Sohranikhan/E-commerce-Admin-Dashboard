import Link from "next/link"
import { FaEdit } from "react-icons/fa"
import { FiMoreVertical } from "react-icons/fi"
import Input from "@/components/Input/Input"
import FormNew from "@/components/FormNew/FormNew"
import CopyLi from "@/components/CopyLi/CopyLi"
import DateFormate from "@/components/DateFormate/DateFormate"

const Table = ({ data, storeId, deleteItem, callback }) => {

    if (data.length > 0) {
        return (
            <div className="w-full h-full min-h-auto overflow-x-auto scrollbarnone">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Label</th>
                            <th>Image</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={`${item._id}`}>
                                <th>{index}</th>
                                <td>{item.label}</td>
                                <td>{item.imageUrl}</td>
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
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        )
    } else {
        return (
            <div className=" w-full">

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Label</th>
                            <th>Image</th>
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