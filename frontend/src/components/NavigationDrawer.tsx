"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import styled from "styled-components";
import ClientOnly from "./ClientOnly";
import CloseIcon from "./CloseIcon";
import OriginalDrawer from "./Drawer";
import { NavItems } from "../../types";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavigationDrawerProps = PropsWithChildren<{ items: NavItems }>;

export default function NavigationDrawer({
  children,
  items,
}: NavigationDrawerProps) {
  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target
            openClass="drawer-opened"
            closedClass="drawer-closed"
          >
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerCloseButton />
                <NavItemsList items={items} />
              </div>
            </div>
          </OriginalDrawer.Target>
        </ClientOnly>
      </Wrapper>
      {children}
    </OriginalDrawer.Drawer>
  );
}

function NavItemsList({ items }: NavigationDrawerProps) {
  const { close } = OriginalDrawer.useDrawer();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChangeComplete() {
      close();
    }

    // Uncomment the following lines if you want to close the drawer on route change
    // router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [close, router]);

  return (
    <ul>
      {items.map((singleItem, idx) => {
        return (
          <NavItem key={idx}>
            <Link href={singleItem.href} onClick={() => close()}>
              {singleItem.title}
            </Link>
          </NavItem>
        );
      })}
    </ul>
  );
}

function DrawerCloseButton() {
  const { close } = OriginalDrawer.useDrawer(); // Access the close function here
  const ref = useRef(null);
  const a11yProps = OriginalDrawer.useA11yCloseButton(ref);

  return (
    <CloseIcon
      className="close-icon"
      ref={ref}
      onClick={close} // Ensure the close function is called on click
      {...a11yProps}
    />
  );
}

const Wrapper = styled.div`
  .my-drawer {
    width: 100%;
    height: 100%;
    z-index: var(--z-drawer);
    background: rgb(var(--background));
    transition: margin-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);
    overflow: hidden;
  }

  .my-drawer-container {
    position: relative;
    height: 100%;
    margin: auto;
    max-width: 70rem;
    padding: 0 1.2rem;
  }

  .close-icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }

  .drawer-closed {
    margin-left: -100%;
  }

  .drawer-opened {
    margin-left: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    & > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

const NavItem = styled.li`
  a {
    font-size: 3rem;
    text-transform: uppercase;
    display: block;
    color: currentColor;
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
