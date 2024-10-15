"use client"
import { createStore } from "@/actions/storeAction";
import { StoreContext } from "@/context/StoreContext";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const CreateStoreForm = ({ userid }) => {
  const router = useRouter()
  const toast = useToast()
  const {stores, setStores} = useContext(StoreContext)

  return (
    <form action={async (formData) => {
      const res = await createStore(formData);
      if (res.success) {
        const resStore = JSON.parse(res.newStore)
        setStores([...stores, resStore])
        router.push(`/${resStore._id}`)
        toast(res.message, 'success')
      } else {
        toast(res.message, 'error')
      }
    }} className="w-full flex flex-col gap-y-1">
      <input type="text" defaultValue={`${userid}`} name="userid" hidden />
      <label htmlFor="storename" className="mt-3">Store Name</label>
      <input type="text" name="storename" placeholder="Sohrani Clothes" className="input w-full input-bordered" />
      <label htmlFor="storedesc" className="mt-3">Store Description</label>
      <input type="text" name="storedesc" placeholder="About Store" className="input w-full input-bordered" />
      <button className="btn btn-primary mt-3">Create Store</button>
    </form>
  )
}

export default CreateStoreForm