import Button from "@/components/Button/Button";
import CreateStoreForm from "@/components/CreateStoreForm/CreateStoreForm";
import getSession from "@/utils/getSession"
import Link from "next/link";


const page = async () => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login`}>Login First</Link>} />
      </div>
    )
  }
  const user = JSON.parse(session)
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
      <div className="w-full max-w-lg h-full p-4 sm:p-6 min-h-56 bg-base-300 sm:shadow sm:shadow-gray-400 rounded mx-auto">
        <h1 className="text-2xl font-bold text-primary">Enter Your Store Name</h1>
        <p className="my-2 text-sm"><span className="text-warning">ℹ </span>This store name will be also included in your store meta data and content.</p>
        <div className=" w-full my-3">
          <CreateStoreForm userid={`${user.id}`} />
        </div>
      </div>
    </div>
  )
}

export default page