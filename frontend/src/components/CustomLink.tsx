import { PropsWithChildren } from 'react';
import styled from 'styled-components'; 
import Link from 'next/link';

export interface LinkProps {
  href: string;
}

export default function CustomLink({ href, children }: PropsWithChildren<LinkProps>) {
  return (
    <Link href={href}>
      <Anchor>{children}</Anchor>
    </Link>
  );
}

const Anchor = styled.span`
  display: inline;
  width: fit-content;
  text-decoration: none;

  background: linear-gradient(rgb(var(--primary)), rgb(var(--primary)));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 100% 0px;
  transition: 100ms;
  transition-property: background-size, text-decoration, color;
  color: rgb(var(--primary));

  &:hover {
    background-size: 100% 100%;
    text-decoration: none;
    color: rgb(var(--background));
  }

  &:active {
    color: rgb(var(--background));
    background-size: 100% 100%;
  }
`;
