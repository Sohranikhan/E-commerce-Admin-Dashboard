"use client"
import LinkComp from '../LinkComp/LinkComp'
import { FaColumns, FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { FaPager, FaPallet, FaChartLine, FaArrowsUpDown, FaBagShopping, FaCartShopping } from "react-icons/fa6"
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const NavBottom = ({ storeid }) => {
    const path = usePathname()
    const pathArray = path.split('/')
    const isActive = (pathname) => pathArray[pathArray.length - 1] === pathname 
    const [shownav, setShownav] = useState(false)
    return (
        <div className="w-fit fixed top-14 left-0 bg-base-300 h-screen z-10 flex flex-col items-start justify-start gap-3 py-2">
            <div className="manue w-full pr-3 h-8 cursor-pointer flex items-center justify-end transition" onClick={() => setShownav(!shownav)}>{shownav?<FaArrowLeft /> : <FaArrowRight />}</div>

                    <div className="w-full flex gap-2">
                        <div className="w-full flex flex-col gap-y-2 ">
                            <Link href={`/${storeid}`} className={`w-full p-2 ${isActive(storeid)? 'border-l-4 border-accent': ''}`}>
                                <FaChartLine />
                            </Link>
                            <Link href={`/${storeid}/billboards`} className={`w-full p-2 ${isActive('billboards')? 'border-l-4 border-accent': ''}`}>
                                <FaPager />
                            </Link>
                            <Link href={`/${storeid}/categories`} className={`w-full p-2 ${isActive('categories')? 'border-l-4 border-accent': ''}`}>
                                <FaColumns />
                            </Link>
                            <Link href={`/${storeid}/colors`} className={`w-full p-2 ${isActive('colors')? 'border-l-4 border-accent': ''}`}>
                                <FaPallet />
                            </Link>
                            <Link href={`/${storeid}/size`} className={`w-full p-2 ${isActive('size')? 'border-l-4 border-accent': ''}`}>
                                <FaArrowsUpDown />
                            </Link>
                            <Link href={`/${storeid}/products`} className={`w-full p-2 ${isActive('products')? 'border-l-4 border-accent': ''}`}>
                                <FaBagShopping />
                            </Link>
                            <Link href={`/${storeid}/orders`} className={`w-full p-2 ${isActive('orders')? 'border-l-4 border-accent': ''}`}>
                                <FaCartShopping />
                            </Link>
                            <Link href={`/${storeid}/setting`} className={`w-full p-2 ${isActive('setting')? 'border-l-4 border-accent': ''}`}>
                                <FiSettings />
                            </Link>
                        </div>
                        {shownav &&
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <LinkComp text='Dashboard' className={'w-full p-2 text-sm text-white'} url={`/${storeid}`} />
                            <LinkComp text='Billboards' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/billboards`} />
                            <LinkComp text='categories' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/categories`} />
                            <LinkComp text='Colors' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/colors`} />
                            <LinkComp text='Size' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/size`} />
                            <LinkComp text='Products' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/products`} />
                            <LinkComp text='Orders' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/orders`} />
                            <LinkComp text='Setting' className={'w-full p-2 text-sm text-white'} url={`/${storeid}/setting`} />
                        </div>}


                </div>
        </div>
    )
}

export default NavBottom