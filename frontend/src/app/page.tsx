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
import WaveCta from "@/components/WaveCta";

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
            title="PRECISION ENGAGEMENT SCORING"
            overTitle=" Unified Scoring System"
          >
            <h3>Turn social noise into clear signals</h3>
            <p>
              Our proprietary algorithm consolidates social media engagement
              across platforms into a single, actionable score from 0 to 1.
              Track tweets, retweets, likes, and shares in real-time to spot
              emerging trends before they peak.
            </p>
          </BasicSection>
          <BasicSection
            imageUrl="/demo-illustration-2.svg"
            title="INSTANT MARKET PULSE"
            overTitle="Real-Time Analytics"
            reversed
          >
            <h3>Never miss a trending token</h3>
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
          {/* <Cta /> */}
          <FeaturesGallery />
          <Features />
          <Testimonials />
          {/* <ScrollableBlogPosts posts={posts} /> */}
        </DarkerBackgroundContainer>
        <WaveCta />
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 0px;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 2rem;
  }

  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: await getAllPosts(),
//     },
//   };
// }
