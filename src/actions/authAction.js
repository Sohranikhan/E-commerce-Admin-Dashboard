"use server"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { cookies } from "next/headers"
export const login = async (formData) => {
    await connectDB();
    const email = formData.get('email')
    const password = formData.get('password')  
    try {
        const user = await User.findOne({ email: email }).populate({
            path: 'stores',
            model: "Store"
        });
        if (user) {
            if (user.password === password) {
                const expires = Date.now() + 1000 * 1000;
                cookies().set('session', JSON.stringify({
                    id: user._id,
                    name: user.name,
                }), { expires, httpOnly: true });
                return {
                    message: "Successfully Login",
                    user: JSON.stringify(user),
                    success: true,
                    status: 200
                }
            } else {
                return {
                    message: "Incorrect Login details",
                    success: false,
                    status: 500
                }
            }
        } else {
            return {
                message: "Please sign-in first",
                success: false,
                status: 500
            }
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            status: 500
        }
    }
}

export const signin = async (formData) => {
    await connectDB();
    try {
        const name = formData.get('name');
        const email = formData.get('email')
        const password = formData.get('password')
        const user = await User.findOne({ email: email });
        if (user) {
            return {
                message: "You are already registered! Please Login",
                success: false,
                status: 500
            }
        }
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save()
        return {
            message: "Your account has successfully created",
            success: true,
            status: 200
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            status: 500
        }
    }
}