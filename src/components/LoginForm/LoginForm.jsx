"use client"
import { login } from "@/actions/authAction"
import Button from "../Button/Button"
import Input from "../Input/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"
import { useContext, useState } from 'react'
import {IoMdMail} from "react-icons/io"
import {AiOutlineSecurityScan} from "react-icons/ai"
import { StoreContext } from "@/context/StoreContext"

const LoginForm = ({callBack, message}) => {
  const {setStores} = useContext(StoreContext)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()

  return (
    <div>
      <form className="w-full flex flex-col gap-2 mt-4" action={async (formData) => {
        setLoading(true)
        const res = await login(formData);
        if (res.success) {
          const user = JSON.parse(res.user)
          setLoading(false)
          toast(res.message, 'success')
          setStores(user.stores)
            router.push(callBack? callBack: '/')
        } else {
          setLoading(false)
          toast(res.message, 'error')
        }
      }}>
        <label htmlFor="email" className="flex items-center gap-1 mt-3"><IoMdMail size={25}/>Enter Email</label>
        <Input text={'Email'} id="email" type={'email'} name={'email'} />

        <label htmlFor="password" className="flex items-center gap-1 mt-3"><AiOutlineSecurityScan size={25}/>Enter Password</label>
        <Input text={'Password'} id="password" type={'password'} name={'password'} />

        <Button text={'Login'} className={'bg-primary mt-4 h-10 rounded text-black font-bold'} loading={loading} />
      </form>
      <p className=" flex items-center justify-center mt-3">
        Have an account?
        <Link href={'/signin'} className='text-secondary '>Sign-In</Link>
      </p>
{message && <p className="text-center text-error animate-bounce mt-3">{message}</p>}
    </div>
  )
}

export default LoginForm