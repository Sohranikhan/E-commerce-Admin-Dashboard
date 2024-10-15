import { newColor, updateColor } from "@/actions/storeAction";
import Button from "@/components/Button/Button";
import FormNew from "@/components/FormNew/FormNew";
import Headings from "@/components/Headings/Headings";
import Input from "@/components/Input/Input";
import Color from "@/models/Colors";
import getSession from "@/utils/getSession";
import Link from "next/link";

const ColorById = async({params}) => {
  const { colorid, storeid } = params
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login?callback=${encodeURI('/'+storeid+'/colors/'+colorid)}`}>Login First</Link>} />
      </div>
    )
  }
  if (colorid === 'new') {
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Color'} des={'This size will add in your store filter.'} />
        <FormNew subAction={newColor} className={'flex-col'} callback={`/${storeid}/colors`}>
          <Input text={'Color Name'} name={'name'} />
          <Input type={'color'} name={'value'} className={'input color'} />
          <Input name={'storeid'} defaultval={`${storeid}`} hidden={true} />
        </FormNew>
      </div>
    )
  } else {
    const color = await Color.findOne({ _id: colorid })
    if (!color) {
      return (
        <div className="w-full">
          <p>No Data Found</p>
        </div>
      )
    }
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Update Color'} des={'This color will update in your store filter.'} />
        <FormNew subAction={updateColor} className={'flex-col'} callback={`/${storeid}/colors`} btntitle={'Update'}>
          <Input text={'Color Name'} defaultval={color.name} name={'name'} />
          <Input type={'color'} name={'value'} className={'input color'} defaultval={color.value} />
          <Input name={'colorid'} defaultval={`${colorid}`} hidden={true} />
        </FormNew>
      </div>
    )
  }
}

export default ColorById