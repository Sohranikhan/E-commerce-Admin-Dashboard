import { newSize, updateSize } from "@/actions/storeAction"
import Button from "@/components/Button/Button"
import FormNew from "@/components/FormNew/FormNew"
import Headings from "@/components/Headings/Headings"
import Input from "@/components/Input/Input"
import Size from "@/models/Size"
import getSession from "@/utils/getSession"
import Link from "next/link"

const SizeById = async ({ params }) => {
  const session = await getSession();
  const { sizeid, storeid } = params
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login?callback=${encodeURI('/'+storeid+'/size/'+sizeid)}`}>Login First</Link>} />
      </div>
    )
  }
  if (sizeid === 'new') {
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Size'} des={'This size will add in your store filter.'} />
        <FormNew className={'flex-col'} subAction={newSize} callback={`/${storeid}/size`}>
          <Input text={'Size Name'} name={'name'} />
          <Input text={'Size Value'} name={'value'} />
          <Input name={'storeid'} defaultval={`${storeid}`} hidden={true} />
        </FormNew>
      </div>
    )
  } else {

    const size = await Size.findOne({ _id: sizeid })
    if (!size) {
      return (
        <div className="w-full">
          <p>No Data Found</p>
        </div>
      )
    }
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Update Size'} des={'This size will update in your store filter.'} />
        <FormNew subAction={updateSize} className={'flex-col'} callback={`/${storeid}/size`} btntitle={'Update'}>
          <Input text={'Size Name'} defaultval={size.name} name={'name'} />
          <Input text={'Size Value'} defaultval={size.value} name={'value'} />
          <Input name={'sizeid'} defaultval={`${sizeid}`} hidden={true} />
        </FormNew>
      </div>
    )
  }
}

export default SizeById