"use client"
import { StoreContext } from "@/context/StoreContext"
import useToast from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import {FiTrash} from "react-icons/fi"
const DeleteStore = ({storeId}) => {
  const {stores, setStores} = useContext(StoreContext)
    const router = useRouter()
    const toast = useToast()
const deleteStore = (storeId) =>{
fetch('/api/store', {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: storeId })
}).then(data=> data.json()).then(data=>{
    if (data.success) {
        let tStores = stores?.filter(store=> store._id !== storeId)
        toast(data.message, 'success')
        setStores(tStores)

        router.push('/')
    }else{
        toast(data.message, 'error')
    }
})
}

  return (
<button onClick={()=> deleteStore(storeId)}><FiTrash /></button>
)
}

export default DeleteStore