"use client"
import { StoreContext } from "@/context/StoreContext"
import Link from "next/link"
import { useContext } from "react"
import { FaDoorOpen, FaStore } from "react-icons/fa"

const StoreLinks = () => {
    const {stores, error} = useContext(StoreContext)
    if (!stores && !error) {
        return(
            <li className="bg-primary flex items-center text-base-300 font-bold rounded hover:text-base-100 my-1"><Link href={'/login'}><FaDoorOpen /> Login</Link></li>
        ) 
    }
    
    else if(stores?.length > 0){
        return(
                <>
                {stores.map((store)=>(
                <li key={`${store._id}`} className="w-full font-bold flex items-center my-1"><Link href={`/${store._id}`}>{store.name}</Link></li>
            ))}
                        <li className="bg-primary flex items-center text-base-300 font-bold rounded hover:text-base-100 my-1"><Link href={'/createstore'}><FaStore /> Create Store</Link></li>
                </>
               ) 
    }
    else if(stores?.length === 0){
        return(
        <li className="bg-primary flex items-center text-base-300 font-bold rounded hover:text-base-100 my-1"><Link href={'/createstore'}><FaStore /> Create Store</Link></li>
    )
    }else if (error && !stores) {
        return(
            <li className="bg-primary flex items-center text-base-300 font-bold rounded hover:text-base-100 my-1"><Link href={'/login'}><FaDoorOpen /> Login</Link></li>
        )
    }
    else {
        return (
            <li className="flex items-center font-bold rounded  my-1">{error}</li>
          )
    }

}

export default StoreLinks