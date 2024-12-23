"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { ColorModeScript } from "nextjs-color-mode";
import React, {
  Component,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import Footer from "@/components/Footer";
import { GlobalStyle } from "@/components/GlobalStyles";
import Navbar from "@/components/Navbar";
import NavigationDrawer from "@/components/NavigationDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import WaveCta from "@/components/WaveCta";
import {
  NewsletterModalContextProvider,
  useNewsletterModalContext,
} from "@/contexts/newsletter-modal.context";
import { NavItems } from "../../types";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "./LoadingPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const navItems: NavItems = [
  { title: " Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
  { title: "Sign up", href: "/dashboard/register" },
];

const NEXT_STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isGlobalStyleLoaded, setIsGlobalStyleLoaded] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Access the router object

  const stripePromise = loadStripe(NEXT_STRIPE_PUBLIC_KEY || "");

  // Effect to simulate GlobalStyle loading
  useEffect(() => {
    setTimeout(() => {
      console.log("Loading...");
      setIsGlobalStyleLoaded(true);
    }, 500); // Simulate delay for style loading (adjust as needed)
  }, []);

  useEffect(() => {
    const previousRoute = sessionStorage.getItem("previousRoute");

    // If the previous route contained "dashboard" and the current route doesn't, reload the page
    if (
      previousRoute?.includes("dashboard") &&
      !pathname.includes("dashboard")
    ) {
      window.location.reload();
    }

    // Store the current route as the previous route for next navigation
    sessionStorage.setItem("previousRoute", pathname);
  }, [pathname]); // Trigger this effect on route change

  return (
    <>
      <html>
        <head>
          <title>Crypto Engagement Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          {isGlobalStyleLoaded ? (
            <>
              {/* Check if pathname contains dashboard/ */}
              {!pathname.includes("dashboard") && (
                <>
                  <GlobalStyle />
                  <ColorModeScript />
                  <Providers>
                    <Elements stripe={stripePromise}>
                      <Suspense fallback={<LoadingPage />}>
                        <Modals />
                        <Navbar items={navItems} />
                        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                          {children}
                        </main>
                        <Footer />
                      </Suspense>
                    </Elements>
                  </Providers>
                </>
              )}

              {pathname.includes("dashboard") && <>{children}</>}
            </>
          ) : (
            <LoadingPage />
          )}
        </body>
      </html>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <NewsletterModalContextProvider>
      <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
    </NewsletterModalContextProvider>
  );
}

function Modals() {
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  if (!isModalOpened) {
    return null;
  }
  return <NewsletterModal onClose={() => setIsModalOpened(false)} />;
}
