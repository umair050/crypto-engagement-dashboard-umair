"use client";
import styled from "styled-components";
import Page from "@/components/Page";
import { media } from "@/utils/media";
import InformationSection from "@/views/PrivacyPolicyPage/InformationSection";

export default function AboutUsPage() {
  return (
    <Page
      title="About Us"
      description="
StrataMind delivers real-time crypto insights from social media signals."
    >
      <ContactContainer>
        <InformationSection />
      </ContactContainer>
    </Page>
  );
}

const ContactContainer = styled.div`
  display: flex;

  ${media("<=tablet")} {
    flex-direction: column;
  }
`;
