import NextImage from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

import { media } from "@/utils/media";
import Collapse from "@/components/Collapse";
import OverTitle from "@/components/OverTitle";
import SectionTitle from "@/components/SectionTitle";
import ThreeLayersCircle from "@/components/ThreeLayersCircle";
import Container from "@/components/Container";

const TABS = [
  {
    title: "Find Relevant Media Contacts:",
    description:
      "<p>Looking to stay informed and connect with top influencers? StrataMind’s Media Contacts Finder tool makes it easy to pinpoint the most influential voices and media outlets in the crypto sphere.</p>",

    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Real-Time Engagement:",

    description:
      "<p>Follow up with those who amplify trending tokens, creating organic visibility for insights you care about.</p>",

    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Insightful Token Comparisons: Sentiment Benchmarking:",
    description:
      "<p>Track shifts in sentiment and evaluate long-term potential.</p>",
    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Predictive Analytics:",
    description:
      "<p>See where social interest is rising to identify possible price movements.</p>",
    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Sentiment Heatmaps:",
    description:
      "<p>Our sentiment heatmaps give you a visual snapshot of crypto discussions across platforms, highlighting the hottest topics and tokens.</p>",
    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Color-Coded Heatmaps:",
    description:
      "<p>Instantly see which coins and topics are gaining traction.Regional Sentiment Insights: Break down data by region to track global interest.</p>",
    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
  {
    title: "Customizable Views:",
    description:
      "<p>Filter by platform, timeframe, or engagement type for tailored insights.</p>",
    imageUrl: "/demo-illustration-5.png",
    baseColor: "88,193,132",
    secondColor: "124,207,158",
  },
];

export default function FeaturesGallery() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const imagesMarkup = TABS.map((singleTab, idx) => {
    const isactive = singleTab.title === currentTab.title;
    const isFirst = idx === 0;

    return (
      <ImageContainer key={singleTab.title} isActive={isactive}>
        <NextImage
          src={singleTab.imageUrl}
          alt={singleTab.title}
          layout="fill"
          objectFit="contain"
          priority={isFirst}
        />
      </ImageContainer>
    );
  });

  const tabsMarkup = TABS.map((singleTab, idx) => {
    const isactive = singleTab.title === currentTab.title;

    return (
      <Tab isActive={isactive} key={idx} onClick={() => handleTabClick(idx)}>
        <TabTitleContainer>
          <CircleContainer>
            <ThreeLayersCircle
              baseColor={isactive ? "transparent" : singleTab.baseColor}
              secondColor={singleTab.secondColor}
            />
          </CircleContainer>
          <h4>{singleTab.title}</h4>
        </TabTitleContainer>
        <Collapse isOpen={isactive} duration={300}>
          <TabContent>
            <div
              dangerouslySetInnerHTML={{ __html: singleTab.description }}
            ></div>
          </TabContent>
        </Collapse>
      </Tab>
    );
  });

  function handleTabClick(idx: number) {
    setCurrentTab(TABS[idx]);
  }

  return (
    <FeaturesGalleryWrapper>
      <Content>
        <OverTitle> Features Section</OverTitle>
        <SectionTitle>POWERFUL FEATURES FOR CRYPTO TRADERS</SectionTitle>
        <h3>What sets StrataMind apart?</h3>
      </Content>
      <GalleryWrapper>
        <TabsContainer>{tabsMarkup}</TabsContainer>
        {/* {imagesMarkup} */}
      </GalleryWrapper>
    </FeaturesGalleryWrapper>
  );
}

const FeaturesGalleryWrapper = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
`;

const GalleryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  width: 70%;

  ${media("<=desktop")} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  & > *:not(:first-child) {
    margin-top: 1rem;
  }
  text-align: center;
`;

const TabsContainer = styled.div`
  flex: 1;
  margin-right: 4rem;

  & > *:not(:first-child) {
    margin-top: 2rem;
  }

  ${media("<=desktop")} {
    margin-right: 0;
    margin-bottom: 4rem;
    width: 100%;
  }
`;

const ImageContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.8rem;
  flex: ${(p) => (p.isActive ? "2" : "0")};
  box-shadow: var(--shadow-md);

  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media("<=desktop")} {
    width: ${(p) => (p.isActive ? "100%" : "0")};
  }
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-md);
  opacity: ${(p) => (p.isActive ? 1 : 0.6)};
  cursor: pointer;
  border-radius: 0.6rem;
  transition: opacity 0.2s;

  font-size: 1.6rem;
  font-weight: bold;

  ${media("<=desktop")} {
    width: 100%;
  }
`;

const TabTitleContainer = styled.div`
  display: flex;
  align-items: center;

  h4 {
    flex: 1;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  padding-left: calc(5rem + 1.5rem);

  ${media("<=tablet")} {
    padding-left: calc(4rem + 1.25rem);
  }

  p {
    font-weight: normal;
  }
`;

const CircleContainer = styled.div`
  flex: 0 calc(5rem + 1.5rem);

  ${media("<=tablet")} {
    flex: 0 calc(4rem + 1.25rem);
  }
`;
