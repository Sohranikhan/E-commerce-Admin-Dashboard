import { newProduct, updateProduct } from "@/actions/storeAction"
import Button from "@/components/Button/Button"
import FormNew from "@/components/FormNew/FormNew"
import Headings from "@/components/Headings/Headings"
import Input from "@/components/Input/Input"
import Product from "@/models/Product"
import getSession from "@/utils/getSession"
import fetchStore from "@/utils/getStores"
import Link from "next/link"

const ProductById = async ({ params }) => {
  const { productid, storeid } = params
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button className={'btn btn-primary'} text={<Link href={`/login?callback=${encodeURI('/'+storeid+'/products/'+productid)}`}>Login First</Link>} />
      </div>
    )
  }
  const storeData = await fetchStore(storeid)

  if (productid === 'new') {
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Product'} des={'This product will add in your category filter.'} />
        <FormNew subAction={newProduct} className={'flex-col'} callback={`/${storeid}/products`}>
          <Input text={'Product Name'} name={'name'} />
          <Input type={'number'} text={'Product Price'} name={'price'} />
        
          <label htmlFor="sizeid">Select Size</label>
          <select className="select-bordered select" name="sizeid">
            {storeData?.data && storeData?.data?.size?.map((size) => (
              <option key={`${size._id}`} value={`${size._id}`}>{size.name}</option>
            ))}
          </select>

          <label htmlFor="colorid">Select Color</label>
          <select className="select-bordered select" name="colorid">
            {storeData?.data && storeData?.data?.colors?.map((color) => (
              <option key={color._id} value={`${color._id}`}>{color.name}</option>
            ))}
          </select>

          <label htmlFor="categoryid">Select Category</label>
          <select className="select-bordered select" name="categoryid">
            {storeData?.data && storeData?.data?.categories?.map((category) => (
              <option key={category._id} value={`${category._id}`}>{category.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-x-2">
            <Input text={'Featured'} name={'featured'} type={'checkbox'} className={'w-4 h-4 max-w-fit checkbox'} />
            <div className="flex flex-col">
              <h3 className="text-sm font-bold my-1">Featured</h3>
              <p className="text-xs">If you set this featured<br />this will show on main page</p>
            </div>
          </div>
          <Input name={'storeid'} defaultval={`${storeid}`} hidden={true} />

        </FormNew>
      </div>
    )
  } else {

    const product = await Product.findOne({ _id: productid })
    if (!product) {
      return (
        <div className="w-full">
          <p>No Data Found</p>
        </div>
      )
    }
    return (
      <div className="w-full max-w-lg flex flex-col gap-4 p-3">
        <Headings title={'Create New Product'} des={'This product will add in your category filter.'} />
        <FormNew subAction={updateProduct} className={'flex-col'} callback={`/${storeid}/products`} btntitle={'Update'}>
          <Input text={'Product Name'} defaultval={product?.name} name={'name'} />
          <Input type={'number'} defaultval={product?.price} text={'Product Price'} name={'price'} />
          <label htmlFor="sizeid">Select Size</label>
          <select className="select-bordered select" name="sizeid" defaultValue={`${product?.sizeId}`}>
            {storeData?.data && storeData?.data?.size?.map((size) => (
             <option key={size._id} value={`${size._id}`} className={`${size?._id}` == `${product?.sizeId}` ? 'bg-red-400 text-base-200' : ''}>{size.name}
             </option>
            ))}
          </select>

          <label htmlFor="colorid">Select Color</label>
          <select className="select-bordered select" name="colorid" defaultValue={`${product?.colorId}`}>
            {storeData?.data && storeData?.data?.colors?.map((color) => (
              <option key={color._id} value={`${color._id}`} className={`${color._id === product?.color?._id ? 'bg-primary text-base-200' : ''}`}>{color.name}</option>
            ))}
          </select>

          <label htmlFor="categoryid">Select Category</label>
          <select className="select-bordered select" name="categoryid" defaultValue={`${product?.categoryId}`}>
            {storeData?.data && storeData?.data?.categories?.map((category) => (
              <option key={category._id} value={`${category._id}`} className={`${category._id === product?.category?._id ? 'bg-primary text-base-200' : ''}`}>{category.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-x-2">
            <Input text={'Featured'} name={'featured'} type={`checkbox`} className={`w-4 h-4 max-w-fit checkbox`} checked={product?.featured} />
            <div className="flex flex-col">
              <h3 className="text-sm font-bold my-1">Featured</h3>
              <p className="text-xs">If you set this featured<br />this will show on main page</p>
            </div>
          </div>
          <Input name={'productid'} defaultval={`${product?._id}`} hidden={true} />
        </FormNew>
      </div>
    )
  }
}

export default ProductById