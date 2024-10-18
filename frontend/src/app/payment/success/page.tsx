"use client"
import { getAuthUser } from "@/services/BACKEND/useAuth";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
    
    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const response = await getAuthUser();
                console.log(response);
            } catch (error) {
                console.error("Error fetching auth user:", error);
            }
        };

        fetchAuthUser();
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <h1>Payment Successful!</h1>
    );
}
