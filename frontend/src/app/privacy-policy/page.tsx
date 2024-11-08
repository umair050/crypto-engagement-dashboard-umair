"use client";
import styled from "styled-components";
import Page from "@/components/Page";
import { media } from "@/utils/media";
import InformationSection from "@/views/PrivacyPolicyPage/InformationSection";

export default function ContactPage() {
  return (
    <Page
      title="Privacy Policy"
      description="A privacy policy detailing how StrataMind collects, uses, shares, and safeguards personal information on its platform."
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
