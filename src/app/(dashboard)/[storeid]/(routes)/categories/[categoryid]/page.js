import { newCategory, updateCategory } from "@/actions/storeAction";
import Button from "@/components/Button/Button";
import FormNew from "@/components/FormNew/FormNew";
import Headings from "@/components/Headings/Headings";
import Input from "@/components/Input/Input";
import Billboard from "@/models/Billboard";
import Category from "@/models/Category";
import getSession from "@/utils/getSession";
import Link from "next/link";

const CategoryById = async({params}) => {
  const {storeid, categoryid} = params
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login?callback=${encodeURI('/'+storeid+'/categories/'+categoryid)}`}>Login First</Link>} />
      </div>
    )
    }
  const billboards = await Billboard.find();
  if (categoryid === 'new') {
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Category'} des={'This category will add in your store filter.'} />
        <FormNew subAction={newCategory} className={'flex-col'} callback={`/${storeid}/categories`}>
          <Input text={'Category Name'} name={'name'} />

          <label htmlFor="billboardid">Select Billboard</label>
          <select className="select-bordered select" name="billboardid">
            {billboards && billboards?.map((billboard) => (
              <option key={`${billboard._id}`} value={`${billboard._id}`}>{billboard.label}</option>
            ))}
          </select>

          <Input name={'storeid'} defaultval={`${storeid}`} hidden={true} />
        </FormNew>
      </div>
    )
  } else {

    const category = await Category.findOne({ _id: categoryid })
    if (!category) {
      return (
        <div className="w-full">
          <p>No Data Found</p>
        </div>
      )
    }
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Update Category'} des={'This category will update in your store.'} />
        <FormNew subAction={updateCategory} className={'flex-col'} callback={`/${storeid}/categories`} btntitle={'Update'}>
          <Input text={'Category Name'} defaultval={category.name} name={'name'} />

          <label htmlFor="billboardid">Select Billboard</label>
          <select className="select-bordered select" name="billboardid" defaultValue={`${category?.billboardId}`}>
            {billboards && billboards?.map((billboard) => (
              <option key={`${billboard._id}`} value={`${billboard._id}`}>{billboard.label}</option>
            ))}
          </select>   

          <Input name={'categoryid'} defaultval={`${categoryid}`} hidden={true} />

        </FormNew>
      </div>
    )
  }
}

export default CategoryById