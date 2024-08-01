
'use server'
import axiosInstance from "./axios"
import { cookies } from 'next/headers'


export const fetchHome = async () => {
    const access = cookies().get("access")
    if (!access) {
        return null
    }
    let response;
    try {
        response = await axiosInstance.get("/home/data", {
            headers: {
                "Authorization": `Bearer ${access.value}`
            }
        })
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (e: any) {
        console.log("Error on /home/data >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return null
    }

}
export const fetchTable = async () => {
    const access = cookies().get("access")
    if (!access) {
        return null
    }
    let response;
    try {
        response = await axiosInstance.get("/home/analysis", {
            headers: {
                "Authorization": `Bearer ${access.value}`
            }
        })
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (e: any) {
        console.log("Error on /home/data >>>>>>")
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return null
    }

}
export const fetchChart = async (coin: string) => {
    const access = cookies().get("access")
    if (!access) {
        return null
    }
    let response;
    try {
        response = await axiosInstance.get(`/home/trading/${coin}`, {
            headers: {
                "Authorization": `Bearer ${access.value}`
            }
        })
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    } catch (e: any) {
        console.log(`Error on /home/trading/${coin} >>>>>>`)
        console.log(e.response ?? e)
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        return null
    }

}

