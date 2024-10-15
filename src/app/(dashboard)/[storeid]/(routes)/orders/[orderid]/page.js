import getSession from "@/utils/getSession";

const OrderById = async() => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login`}>Login First</Link>} />
      </div>
    )
  }
  return (
    <div>OrderById</div>
  )
}

export default OrderById