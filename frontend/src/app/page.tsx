"use client";

import Head from "next/head";
import styled from "styled-components";
import BasicSection from "@/components/BasicSection";
import Testimonials from "@/views/HomePage/Testimonials";
import Hero from "@/views/HomePage/Hero";
import Partners from "@/views/HomePage/Partners";
import { EnvVars } from "../../env";
import Cta from "@/views/HomePage/Cta";
import FeaturesGallery from "@/views/HomePage/FeaturesGallery";
import Features from "@/views/HomePage/Features";
import CustomLink from "@/components/CustomLink";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection
            imageUrl="/demo-illustration-1.svg"
            title="Turn social noise into clear signals"
            overTitle="PRECISION ENGAGEMENT SCORING"
          >
            <p>
              Our proprietary algorithm consolidates social media engagement
              across platforms into a single, actionable score from 0 to 1.
              Track tweets, retweets, likes, and shares in real-time to spot
              emerging trends before they peak.
            </p>
          </BasicSection>
          <BasicSection
            imageUrl="/demo-illustration-2.svg"
            title="Never miss a trending token."
            overTitle="INSTANT MARKET PULSE"
            reversed
          >
            <p>
              StrataMind continuously monitors social media activity across
              major platforms, providing instant alerts when cryptocurrencies
              start gaining significant social traction. Our system processes
              millions of social signals to give you the earliest possible
              indication of emerging trends.
            </p>
            {/* <ul>
              <li>test</li>
              <li>Professional remark 2</li>
              <li>Professional feature 3</li>
            </ul> */}
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          {/* <ScrollableBlogPosts posts={posts} /> */}
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: await getAllPosts(),
//     },
//   };
// }
