"use client";
import { getAuthUser } from "@/services/BACKEND/useAuth";
import { useEffect } from "react";
import "../payment.css";

export default function PaymentCancelPage() {
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
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Failure message */}
      <div className="message-box _success _failed">
        <i className="fa fa-times-circle" aria-hidden="true"></i>
        <h2>Your payment failed</h2>
        <p>Try again later</p>
      </div>
    </div>
  );
}
