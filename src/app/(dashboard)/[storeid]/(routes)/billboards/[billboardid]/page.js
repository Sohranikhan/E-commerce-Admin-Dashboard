import { newBillboard, updateBillboard } from "@/actions/storeAction";
import Button from "@/components/Button/Button";
import FormNew from "@/components/FormNew/FormNew";
import Headings from "@/components/Headings/Headings";
import Input from "@/components/Input/Input";
import Billboard from "@/models/Billboard";
import getSession from "@/utils/getSession";
import Link from "next/link";

const BillboardById = async({params}) => {
  const session = await getSession();
  const {storeid, billboardid} = params
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login?callback=${encodeURI('/'+storeid+'/billboards/'+billboardid)}`}>Login First</Link>} />
      </div>
    )
  }
  if (billboardid === 'new') {
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Billboard'} des={'This billboards will be add in your store categories.'} />
        <FormNew subAction={newBillboard} callback={`/${storeid}/billboards`} className={'flex-col'}>
          <Input text={'Billboard Label'} name={'label'} />
          <Input text={'Billboard Image Url'} name={'imageurl'} />
          <Input name={'storeid'} defaultval={`${storeid}`} hidden={true} />
        </FormNew>
      </div>
    )
  } else {

    const billboard = await Billboard.findOne({ _id: billboardid })
    if (!billboard) {
      return (
        <div className="w-full">
          <p>No Data Found</p>
        </div>
      )
    }
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Update Billboard'} des={'This billboard will update in your store categories.'} />
        <FormNew subAction={updateBillboard} callback={`/${storeid}/billboards`} className={'flex-col'} btntitle={'Update'}>
          <Input text={'Billboard Label'} defaultval={billboard.label} name={'label'} />
          <Input text={'Billboard Image Url'} defaultval={billboard.imageUrl} name={'imageurl'} />
          <Input name={'billboardid'} defaultval={`${billboard._id}`} hidden={true} />
        </FormNew>
      </div>
    )
  }
}

export default BillboardById