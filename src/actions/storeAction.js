"use server"
import Billboard from "@/models/Billboard"
import Category from "@/models/Category"
import Color from "@/models/Colors"
import Image from "@/models/Image"
import Product from "@/models/Product"
import Size from "@/models/Size"
import Store from "@/models/Store"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import getSession from "@/utils/getSession"

export const createStore = async (formData) => {
    await connectDB()
    const userId = formData.get('userid')
    const storeName = formData.get('storename')
    const storeDesc = formData.get('storedesc')
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return {
                success: false,
                message: "Invalid User",
            }
        }
        const newStore = new Store({
            name: storeName,
            description: storeDesc,
            owner: userId
        })
        user.stores.push(newStore._id)

        await newStore.save();
        await user.save()
        if (newStore) {
            return {
                success: true,
                message: "Store Successfully created",
                newStore: JSON.stringify(newStore),
            }
        }
        return {
            success: false,
            message: "Database Error",
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const newBillboard = async(formData)=>{
    const label = formData.get('label')
    const imageUrl = formData.get('imageurl') || '/public/hero/Banner-Mobile-720-by-1080-without-text.webp'
    const storeId = formData.get('storeid')
    try {
        const newBillboard = new Billboard({
            label,
            imageUrl,
            storeId
        })
        await newBillboard.save()
        if (newBillboard) {
            await Store.updateOne({ _id: storeId }, { $push: { billboards: newBillboard._id } })
            return {
                success: true,
                message: 'Successfully created'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const updateBillboard = async (formData) => {
    const label = formData.get('label')
    const imageUrl = formData.get('imageurl') || '/public/hero/Banner-Mobile-720-by-1080-without-text.webp'
    const billboardId = formData.get('billboardid')
    try {
        await Billboard.updateOne({ _id: billboardId }, { $set: { label, imageUrl } })
        return {
            success: true,
            message: 'Successfully Updated'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const deleteBillboard = async(formData)=>{
    const billboardId = formData.get('itemid')
    const storeId = formData.get('storeid')
const session = await getSession()
    try {
        if (!session) {
            return {
                success: false,
                message: "Please Login First"
            }
        }
        await Billboard.deleteOne({ _id: billboardId });
        await Category.updateOne({_id: storeId},{$set: {billboardId: null}})
        await Store.updateOne({_id: storeId},{$pull: {billboards: billboardId}})
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const newCategory = async(formData)=>{
    const name = formData.get('name')
    const billboardId = formData.get('billboardid')
    const storeId = formData.get('storeid')
    try {
        const newCategory = new Category({
            name,
            billboardId,
            storeId
        })
        await newCategory.save()
        if (newCategory) {
            await Store.updateOne({ _id: storeId }, { $push: { categories: newCategory._id } })
            return {
                success: true,
                message: 'Successfully created'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const updateCategory = async (formData) => {
    const name = formData.get('name')
    const billboardId = formData.get('billboardid')
    const categoryId = formData.get('categoryid')
    try {
        await Category.updateOne({ _id: categoryId }, { $set: { name, billboardId } })
        return {
            success: true,
            message: 'Successfully Updated'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const deleteCategory =async(formData)=>{
    const categoryId = formData.get('itemid')
    const storeId = formData.get('storeid')
    const session = await getSession()

    try {
        if (!session) {
            return {
                success: false,
                message: "Please Login First"
            }
        }
        await Category.deleteOne({ _id: categoryId });
        await Store.updateOne({_id: storeId},{$pull: {categories: categoryId}})
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const newColor = async (formData) => {
    const name = formData.get('name')
    const value = formData.get('value')
    const storeid = formData.get('storeid')
    try {
        const newColor = new Color({
            name,
            value,
            storeId: storeid
        })
        await newColor.save()
        if (newColor) {
            await Store.updateOne({ _id: storeid }, { $push: { colors: newColor._id } })
            return {
                success: true,
                message: 'Successfully created'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const updateColor = async (formData) => {
    const name = formData.get('name')
    const value = formData.get('value')
    const colorId = formData.get('colorid')
    try {
        await Color.updateOne({ _id: colorId }, { $set: { name, value } })
        return {
            success: true,
            message: 'Successfully Updated'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const deleteColor = async (formData) => {
    const colorId = formData.get('itemid')
    const storeId = formData.get('storeid')
    const session = await getSession()

    try {
        if (!session) {
            return {
                success: false,
                message: "Please Login First"
            }
        }
        await Color.deleteOne({ _id: colorId });
        await Store.updateOne({_id: storeId},{$pull: {colors: colorId}})
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export const newSize = async (formData) => {
    const name = formData.get('name')
    const value = formData.get('value')
    const storeid = formData.get('storeid')
    try {
        const newSize = new Size({
            name,
            value,
            storeId: storeid
        })
        await newSize.save()
        if (newSize) {
            await Store.updateOne({ _id: storeid }, { $push: { size: newSize._id } })
            return {
                success: true,
                message: 'Successfully created'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const updateSize = async (formData) => {
    const name = formData.get('name')
    const value = formData.get('value')
    const sizeid = formData.get('sizeid')
    try {
        await Size.updateOne({ _id: sizeid }, { $set: { name: name, value: value } })
        return {
            success: true,
            message: 'Successfully Updated'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const deleteSize = async (formData) => {
    const sizeId = formData.get('itemid')
    const storeId = formData.get('storeid')
    const session = await getSession()

    try {
        if (!session) {
            return {
                success: false,
                message: "Please Login First"
            }
        }
        await Size.deleteOne({ _id: sizeId });
        await Store.updateOne({_id: storeId},{$pull: {size: sizeId}})
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export const newProduct = async (formData) => {
    const name = formData.get('name')
    const price = formData.get('price')
    const sizeId = formData.get('sizeid') || null
    const colorId = formData.get('colorid') || null
    const categoryId = formData.get('categoryid') || null
    const featured = formData.get('featured')
    const storeId = formData.get('storeid')
    try {
        const newProduct = new Product({
            name,
            price,
            storeId,
            sizeId,
            colorId,
            categoryId,
            featured: featured == 'true'? true: false
        })
        await newProduct.save()
        if (newProduct) {
        await Category.updateOne({_id: categoryId},{$push:{products: newProduct._id}})
        await Store.updateOne({_id: storeId},{$push:{products: newProduct._id}})
            return {
                success: true,
                message: 'Successfully created'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}
export const updateProduct = async (formData) => {
    const name = formData.get('name')
    const price = formData.get('price')
    const sizeId = formData.get('sizeid') || null
    const colorId = formData.get('colorid') || null
    const categoryId = formData.get('categoryid') || null
    const featured = formData.get('featured')
    const productId = formData.get('productid')
    try {
      const up = await Product.updateOne({_id: productId},{$set:{name,price,sizeId,colorId,categoryId,featured: featured == 'true'? true: false}})
      await Category.updateMany({$pull:{products: productId}})
      await Category.updateOne({_id: categoryId},{$push:{products: productId}})
        if (up) {
            return {
                success: true,
                message: 'Successfully Updated'
            }
        } else {
            return {
                success: false,
                message: 'Database error'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
    
}
export const deleteProduct = async (formData) => {
    const productId = formData.get('itemid')
    const storeId = formData.get('storeid')
    const session = await getSession()
console.log(productId, storeId, session);
    try {
        if (!session) {
            return {
                success: false,
                message: "Please Login First"
            }
        }
        await Product.deleteOne({ _id: productId });
        await Category.updateMany({products: productId},{$pull:{
            products: productId
        }})
        await Image.deleteMany({productId: productId, storeId: storeId})
        await Store.updateOne({_id: storeId},{$pull: {products: productId}})
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

