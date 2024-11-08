import styled from "styled-components";

import { media } from "@/utils/media";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import HeroIllustration from "@/components/HeroIllustation";
import OverTitle from "@/components/OverTitle";
import Container from "@/components/Container";
import { useNewsletterModalContext } from "@/contexts/newsletter-modal.context";
import Link from "next/link";

export default function Hero() {
  const { setIsModalOpened } = useNewsletterModalContext();

  return (
    <HeroWrapper>
      <Contents>
        <CustomOverTitle>Hero Section</CustomOverTitle>
        <Heading>STRATAMIND: SOCIAL INTELLIGENCE FOR CRYPTO MARKETS</Heading>
        <Description>
          Transform social signals into actionable crypto insights with our
          pioneering engagement scoring system
        </Description>
        <CustomButtonGroup>
          <Button onClick={() => setIsModalOpened(true)}>
            START TRACKING NOW <span>&rarr;</span>
          </Button>
          <Link href="#whitepaper">
            <Button transparent>
              VIEW LIVE DEMO <span>&rarr;</span>
            </Button>
          </Link>
        </CustomButtonGroup>
      </Contents>
      <ImageContainer>
        <HeroIllustration />
      </ImageContainer>
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media("<=desktop")} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media("<=desktop")} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media("<=desktop")} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media("<=desktop")} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;
  color: #4a90e2; /* Complementary light blue for strong contrast */

  ${media("<=tablet")} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;
