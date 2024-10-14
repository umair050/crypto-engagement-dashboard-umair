"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import dynamic from "next/dynamic";
import { ColorModeScript } from "nextjs-color-mode";
import React, { Component, PropsWithChildren } from "react";
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

const navItems: NavItems = [
  { title: "Awesome SaaS Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
  { title: "Sign up", href: "/signup", outlined: true },
];

const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body>
          <ColorModeScript />
          <GlobalStyle />

          <Providers>
            <Modals />
            <Navbar items={navItems} />

            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
              {children}
            </main>
            <WaveCta />
            <Footer />
          </Providers>
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
