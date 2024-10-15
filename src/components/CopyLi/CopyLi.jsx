"use client"
import { FaCopy } from "react-icons/fa"
import useToast from "@/hooks/useToast"

const CopyLi = ({value}) => {
    const toast = useToast()
    const copyValue = (value) => {
        navigator.clipboard.writeText(`${value}`).then(() => {
            toast('Data copied', 'success')
        })
    }
  return (
<li className="list-none"><button  onClick={() => copyValue(value)} className="flex items-center gap-1"><FaCopy /> Copy</button></li>
  )
}

export default CopyLi