import Link from "next/link"
import Button from "../Button/Button"
import { cookies } from "next/headers"
import {FaDoorOpen, FaSignOutAlt} from "react-icons/fa"
const logOut =async()=>{
  "use server"
  cookies().set('session','', { expires:Date.now(), httpOnly: true })
}
const AuthBtn = ({user}) => {

  if (user) {
    return (
      <form action={logOut} className="flex items-center gap-1">
        <FaSignOutAlt />
         <Button text={`Log Out`} className={''}/> 
      </form>
    )
  }
  return(
    <Link href={'/login'} className="flex items-center gap-1"><FaDoorOpen />Login</Link>
  )
  }

export default AuthBtn