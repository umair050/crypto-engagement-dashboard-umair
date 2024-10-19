"use client";
import { getAuthUser } from "@/services/BACKEND/useAuth";
import { useEffect } from "react";
import "../payment.css";

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
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Success message */}
      <div className="message-box _success">
        <i className="fa fa-check-circle" aria-hidden="true"></i>
        <h2>Your payment was successful</h2>
        <p>
          Thank you for your payment. We will <br />
          be in contact with more details shortly.
        </p>
      </div>
    </div>
  );
}
