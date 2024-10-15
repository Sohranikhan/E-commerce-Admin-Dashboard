import Link from 'next/link'
import Image from 'next/image'
import Input from '../Input/Input'
import getSession from '@/utils/getSession'
import NavBottom from '../NavBottom/NavBottom'
import { FaShoppingCart, FaSearch, FaSignInAlt, } from "react-icons/fa"
import Button from '../Button/Button'
import AuthBtn from "../AuthBtn/AuthBtn"

const StoreNavbar = async () => {
    const session = await getSession()
    let user;
    if (session) {
        user = JSON.parse(session)
    }

    return (
        <div className="storevavbar w-full flex flex-col items-start justify-start">
            <div className=" w-full flex items-center justify-between h-12 bg-[#1b1b1b]">
                <Link href='/' className='mx-2 w-[20%]'>
                    <Image src="/logo/logo-white.png" width={140} height={24} alt="Ebuy Logo" className='h-auto w-auto max-w-28 max-h-10' />
                </Link>
                <div className="searchInput w-full max-w-md hidden md:flex h-auto my-auto relative items-center justify-center">
                    <Input text={'Search here'} />
                    <Button className='absolute top-0 right-2 w-6 flex items-center justify-center h-full bg-transparent' text={<FaSearch />} />
                </div>
                <div className="userInfo w-fit min-w-[20%] h-full flex items-center justify-end gap-4">
                    {user?.name ?
                        <p>{user.name}</p>
                        // <Image src={user.image} alt={user.name} width={28} height={28} className='rounded-full w-auto h-auto' />
                        :
                        <Link href='/signin' className='flex gap-2 items-center'><FaSignInAlt />Sign in</Link>
                    }
                    <div className="cartBtn relative h-full flex items-center cursor-pointer rounded-sm mx-2">
                        <p className='text-3xl'><FaShoppingCart size={25} /> </p>
                        <p className='absolute top-[-2px] left-[13px] text-sm'>0</p>
                    </div>
                </div>
            </div>
            {/* Second Navbar */}
            <NavBottom>
                <AuthBtn user={user} />
            </NavBottom>
        </div>
    )
}

export default StoreNavbar