"use client";
import styled from "styled-components";
import Page from "@/components/Page";
import { media } from "@/utils/media";
import InformationSection from "@/views/TermsOfServicePage/InformationSection";

export default function TermsOfServicePage() {
  return (
    <Page
      title="Terms Of Service"
      description="Review the terms governing your use of StrataMind's platform, including features, subscriptions, and user responsibilities."
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
