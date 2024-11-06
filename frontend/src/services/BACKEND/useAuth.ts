'use server'
import axios from 'axios'
import { cookies } from 'next/headers';


export const login = async ({ username, password }: { username: string, password: string }): Promise<{ success: boolean, user:any }> => {

    let response;
    try {
        response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}` + "/login", { username, password })
        console.log("LOGIN DATA",response.data);
        

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


export const subscription = async ( priceId : string ) => { 
    console.log("PRICE ID: " + priceId);
    const access = cookies().get("access")
    console.log("Access Line no 61", access);
    
    try {
        // Make POST request with headers
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND}create-checkout-session`,
            { priceId },  // Request body
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`  // Authorization header
                }
            }
        );
    
        if (response.status === 200) {
            console.log("response", 
                response.data
            );
            
            return { success: true, id: response.data.id };
        } else {
            return { success: false, user: null }
        }
    
    } catch (e: any) {
        console.error(e);  // Log the error for debugging
    
        return {
            success: false,
        };
    }


}


export const getAuthUser = async ( ) => { 
    const access = cookies().get("access")
    try {
        // Make POST request with headers
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}me`,
            {
                headers: {
                    "Authorization": `Bearer ${access?.value}`  // Authorization header
                }
            }
        );
    
        console.log("RES", response.data);
        cookies().set("user", JSON.stringify(response.data.user), { maxAge: 3600 * 24 * 2 })
        return response.data;
    
    } catch (e: any) {
        console.error(e);  // Log the error for debugging
    
        return {
            success: false,
        };
    }


}

export const logout = async () => {
    cookies().delete("access")
}