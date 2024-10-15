import Link from 'next/link'
import Image from 'next/image'
import Input from '../Input/Input'
import getSession from '@/utils/getSession'
import { FaSignInAlt } from "react-icons/fa"
import { FaShop } from "react-icons/fa6"
import StoreLinks from '../StoreLinks/StoreLinks'

const Navbar = async () => {
    const session = await getSession()
    let user = null;
    if (session) {
        user = JSON.parse(session)
    }
    return (
        <div className="w-full z-20 flex flex-col fixed top-0 left-0 items-start justify-start m-0">
            <div className=" w-full flex items-center justify-between h-14 bg-[#1b1b1b]">
                <Link href='/' className='mx-2 w-[20%]'>
                    <Image src="/logo/dark-logo.png" width={150} height={56} alt="Ebuy Logo" className='h-auto max-h-12 w-auto' />
                </Link>
                <div className="searchInput w-full max-w-md hidden md:flex h-auto my-auto relative items-center justify-center">
                    <Input text={'Search here'} />
                    {/* <Button className='absolute top-0 right-2 w-6 flex items-center justify-center h-full bg-transparent' text={<FaSearch />} /> */}
                </div>
                <div className="userInfo w-fit min-w-[20%] h-full flex items-center justify-end gap-4">
                    {user?.name ?
                        <p>{user.name}</p>
                        // <Image src={user.image} alt={user.name} width={28} height={28} className='rounded-full w-auto h-auto' />
                        :
                        <Link href='/signin' className='flex gap-2 items-center'><FaSignInAlt />Sign in</Link>
                    }
                    <div className="dropdown dropdown-hover dropdown-left cartBtn h-full flex items-center cursor-pointer rounded-sm mx-2">
                        <div tabIndex={0} role='button'><p className='text-3xl'><FaShop size={25} /> </p></div>
                        <ul tabIndex={0} className='dropdown-content z-10 menu p-2 shadow bg-base-300 rounded-box w-52'>
                            <StoreLinks />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar