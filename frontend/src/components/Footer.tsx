import NextLink from "next/link";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import styled from "styled-components";
import Container from "@/components/Container";
import { media } from "@/utils/media";
import Link from "next/link";

type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };
type FooterItems = SingleFooterList[];

const footerItems: FooterItems = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "/about-us" },
      { title: "Terms of Service", href: "/terms-of-service" },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/blog" },
      { title: "Help Center", href: "/help-center" },
    ],
  },
  {
    title: "Contact Info",
    items: [{ title: "Email: ryg94@stratamind.io", href: "/blog" }],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <ShareBar>
            <Link href="https://www.twitter.com/my-saas-startup" passHref>
              <TwitterIcon size={50} round={true} />
            </Link>

            <Link href="https://www.facebook.com/my-saas-startup" passHref>
              <FacebookIcon size={50} round={true} />
            </Link>

            <Link href="https://www.linkedin.com/my-saas-startup" passHref>
              <LinkedinIcon size={50} round={true} />
            </Link>
          </ShareBar>
          <Copyright>&copy; 2024 StrataMind - All rights reserved</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <Link href={href} passHref>
        {title}
      </Link>
    </ListItemWrapper>
  );
}

const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media("<=tablet")} {
    flex: 0 40%;
    margin-right: 1.5rem;
  }

  ${media("<=phone")} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const ShareBar = styled.div`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
