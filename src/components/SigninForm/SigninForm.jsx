"use client"
import Input from '../Input/Input'
import Button from '../Button/Button'
import { signin } from '@/actions/authAction'
import Link from 'next/link'
import useToast from '@/hooks/useToast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {AiOutlineSecurityScan} from "react-icons/ai"
import {FaIdBadge, FaMailBulk} from "react-icons/fa"


const SigninForm = () => {
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const router = useRouter()

    return (
        <>
            <form className="w-full flex flex-col gap-2 mt-4" action={async (formData) => {
                setLoading(true)
                const res = await signin(formData);
                if (res.success) {
                    setLoading(false)
                    toast(res.message,'success')
                    setTimeout(()=>{
router.push('/login');
                    },3000)
                } else {
                    setLoading(false)
                    toast(res.message,'error') 
                }
            }}>
                <label className='flex gap-1 items-center mt-2' htmlFor="name"><FaIdBadge size={23}/>Enter Name</label>
                <Input text={'Name'} name={'name'} />

                <label className='flex gap-1 items-center mt-2' htmlFor="email"><FaMailBulk size={23}/>Enter Email</label>
                <Input text={'Email'} name='email' type={'email'} />

                <label className='flex gap-1 items-center mt-2' htmlFor="password"><AiOutlineSecurityScan size={23}/>Enter Password</label>
                <Input text={'Password'} type={'password'} name='password' />

                <Button text={'Sign-in'} loading={loading} className={'bg-primary h-10 rounded my-3 text-black font-bold'} />
            </form>
            <p className='flex items-center justify-center'>
                Do not have an account?
                <Link href={'/login'} className='text-secondary'>Login</Link>
            </p>
        </>
    )
}

export default SigninForm