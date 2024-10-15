'use server'
import axios from 'axios'
import { cookies } from 'next/headers';


export const login = async ({ username, password }: { username: string, password: string }): Promise<{ success: boolean, user:any }> => {

    let response;
    try {
        response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}` + "/login", { username, password })
        console.log(response.data);
        

        if (response.status === 200) {
            cookies().set("access", response.data.access_token, { maxAge: 3600 * 24 * 2 })
            cookies().set("user", JSON.stringify(response.data.user), { maxAge: 3600 * 24 * 2 })
            return { success: true, user: response.data.user };
        } else {
            return { success: false, user: null }
        }
    } catch (e: any) {
        console.log("Error on /login >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return {
            success: false, user: null
        }
    }



}
export const register = async ({ username, password }: { username: string, password: string }) => {
    let response;
    try {
        response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}` + "/register", { username, password })



        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (e: any) {
        console.log("Error on /register >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return {
            success: false,
        }
    }


}


export const logout = async () => {
    cookies().delete("access")
}