
export async function generateMetadata() {
  return {
      title: "Store",
      description: "desc store"
  }
}

const page = async({params}) => {
    const {id} = params
  return (
    <div>page</div>
  )
}

export default page