import React from 'react'
import CopyLi from '../CopyLi/CopyLi'
import Link from 'next/link'

const ApiProvider = ({path}) => {
  return (
    <div className='w-full flex items-center gap-1'>
<p className='bg-primary text-base-300 font-bold rounded text-base'>GET</p>
        <Link href={path} target='blank' className='hover:underline active:text-primary font-mono'>{path}</Link>
        <CopyLi value={path} /></div>
  )
}

export default ApiProvider