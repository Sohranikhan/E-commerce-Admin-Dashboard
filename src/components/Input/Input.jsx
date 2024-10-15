"use client"
import { useState } from "react"

const Input = ({text, type, className, name, hidden, defaultval, checked}) => {
    const [check, setCheck] = useState(checked? checked : false)
    if (type && type === 'password') {
        return (
            <div className="relative w-full">
            <input type={'password' } name={name? name:''} className={`input input-bordered w-full ${className}`} placeholder={text} hidden={hidden? hidden : false} />
            </div>
                )
    }
    else if(type && type === 'checkbox'){
        return(
            <input type={'checkbox' } value={check} onChange={()=> setCheck(!check)} name={name? name:''} checked={check} className={`input input-bordered w-full h-10 px-2 ${className}`} placeholder={text} hidden={hidden? hidden :false} />
        )
    }
    else{
        return (
            <input type={type? type : 'text' } name={name? name:''} defaultValue={defaultval? defaultval: ''} className={`input input-bordered w-full h-10 px-2 ${className}`} placeholder={text} hidden={hidden? hidden :false} />
                )
    }
  }
  
  export default Input