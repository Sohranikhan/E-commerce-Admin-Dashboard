"use client"
import { useState } from "react"
import Button from "../Button/Button"
import useToast from "@/hooks/useToast"
import { useRouter } from "next/navigation"

const FormNew = ({children, subAction, callback, className, btntitle}) => {
    const toast = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  return (
    <form action={async(formData)=>{
        setLoading(true)
        const perm = confirm('Are you want to continue this process')
        if(!perm) {
            setLoading(false)
            return
        }
        const res = await subAction(formData);
        if (res.success) {
            toast(res.message, 'success')
            setLoading(false)
            router.push(`${callback}` || '/')
            router.refresh()
        } else {
            toast(res.message, 'error') 
            setLoading(false)
        }
    }} className={`${className} w-full h-fit flex gap-2`}>
{children}
<Button className={className?className:'btn-primary w-fit'}text={btntitle?btntitle:'Create'} loading={loading}/>
    </form>
  )
}

export default FormNew