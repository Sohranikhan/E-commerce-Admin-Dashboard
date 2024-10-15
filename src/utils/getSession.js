import { cookies } from "next/headers"
const getSession = async()=>{
    let session = cookies().get('session')?.value
    if (session === undefined) {
        return null
    }
    return session;
}
export default getSession