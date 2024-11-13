"use client";
import dynamic from "next/dynamic";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { media } from "@/utils/media";
import Button from "./Button";
import Container from "./Container";
import Drawer from "./Drawer";
import { HamburgerIcon } from "./HamburgerIcon";
import { useNewsletterModalContext } from "@/contexts/newsletter-modal.context";
import { NavItems, SingleNavItem } from "../../types";
import {
  ScrollPositionEffectProps,
  useScrollPosition,
} from "@/hooks/useScrollPosition";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoLight from "../../public/Strara Mind Logo/lightlogo.png";
import LogoDark from "../../public/Strara Mind Logo/darklogo.png";
const ColorSwitcher = dynamic(() => import("../components/ColorSwitcher"), {
  ssr: false,
});

type NavbarProps = { items: NavItems };
type ScrollingDirections = "up" | "down" | "none";
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const routerPath = usePathname();
  const { toggle } = Drawer.useDrawer();
  const [scrollingDirection, setScrollingDirection] =
    useState<ScrollingDirections>("none");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for "next-dark-theme" class on <body>
  useEffect(() => {
    const checkBodyClass = () => {
      const body = document.body;
      setIsDarkMode(body.classList.contains("next-dark-theme"));
    };

    checkBodyClass(); // Run on component mount

    // Optionally, observe class changes if theme toggles during app usage
    const observer = new MutationObserver(checkBodyClass);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  let lastScrollY = useRef(0);
  const lastRoute = useRef("");
  const stepSize = useRef(50);

  useScrollPosition(
    scrollPositionCallback,
    [routerPath],
    undefined,
    undefined,
    50
  );

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection("none");
      return;
    }

    const currentScrollY = currPos.y;
    const isScrollingUp = currentScrollY > lastScrollY.current;
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY);
    const hasScrolledWholeStep = scrollDifference >= stepSize.current;
    const isInNonCollapsibleArea = lastScrollY.current > -50;

    if (isInNonCollapsibleArea) {
      setScrollingDirection("none");
      lastScrollY.current = currentScrollY;
      return;
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY;
      return;
    }

    setScrollingDirection(isScrollingUp ? "up" : "down");
    lastScrollY.current = currentScrollY;
  }

  const isNavbarHidden = scrollingDirection === "down";
  const isTransparent = scrollingDirection === "none";

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <LogoWrapper>
          <Link href="/">
            <Image
              src={isDarkMode ? LogoDark : LogoLight} // Switch logos based on theme class
              alt="Strara Mind Logo"
              width={100} // Set width
              height={70} // Set height
            />
          </Link>
        </LogoWrapper>

        <NavItemList>
          {items.map((singleItem) => (
            <NavItem key={singleItem.href} {...singleItem} />
          ))}
        </NavItemList>
        <ColorSwitcherContainer>
          <ColorSwitcher />
        </ColorSwitcherContainer>
        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

function NavItem({ href, title, outlined }: SingleNavItem) {
  const { setIsModalOpened } = useNewsletterModalContext();

  function showNewsletterModal() {
    setIsModalOpened(true);
  }

  if (outlined) {
    return <CustomButton onClick={showNewsletterModal}>{title}</CustomButton>;
  }

  return (
    <NavItemWrapper outlined={outlined}>
      <Link href={href} passHref>
        {title}
      </Link>
    </NavItemWrapper>
  );
}

const CustomButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
`;

const NavItemList = styled.div`
  display: flex;
  list-style: none;

  ${media("<desktop")} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  ${media(">=desktop")} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  margin-right: auto;
  text-decoration: none;

  color: rgb(var(--logoColor));
`;

const NavItemWrapper = styled.li<Partial<SingleNavItem>>`
  background-color: ${(p) =>
    p.outlined ? "rgb(var(--primary))" : "transparent"};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:hover {
    background-color: ${(p) =>
      p.outlined ? "rgb(var(--primary), 0.8)" : "transparent"};
    transition: background-color 0.2s;
  }

  a {
    display: flex;
    color: ${(p) =>
      p.outlined ? "rgb(var(--textSecondary))" : "rgb(var(--text), 0.75)"};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  visibility: ${(p) => (p.hidden ? "hidden" : "visible")};
  transform: ${(p) =>
    p.hidden
      ? `translateY(-8rem) translateZ(0) scale(1)`
      : "translateY(0) translateZ(0) scale(1)"};

  transition-property: transform, visibility, height, box-shadow,
    background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ColorSwitcherContainer = styled.div`
  width: 4rem;
  margin: 0 1rem;
`;
