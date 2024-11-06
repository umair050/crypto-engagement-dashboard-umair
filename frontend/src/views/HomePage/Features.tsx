"use client";

import React from "react";
import styled from "styled-components";

import { media } from "@/utils/media";
import AutofitGrid from "@/components/AutofitGrid";
import BasicCard from "@/components/BasicCard";
import Container from "@/components/Container";

const FEATURES = [
  {
    // imageUrl: "/grid-icons/asset-1.svg",
    title: "Unified Engagement Score",
    description:
      "- Real-time scoring from 0 to 1\n- Cross-platform signal integration\n- Weighted engagement metrics",
  },
  {
    // imageUrl: "/grid-icons/asset-2.svg",
    title: "Trend Detection",
    description:
      "- Early pattern recognition\n- Automated alert system\n- Historical trend comparison",
  },
  {
    // imageUrl: "/grid-icons/asset-3.svg",
    title: "Platform Analytics",
    description:
      "- Twitter engagement metrics\n- Reddit sentiment analysis (coming soon)\n- Discord activity tracking (coming soon)",
  },
  {
    // imageUrl: "/grid-icons/asset-4.svg",
    title: "Custom Alerts(all features coming soon)",
    description:
      "- Score threshold notifications\n- Sudden spike detection\n- Custom alert conditions",
  },
];

export default function Features() {
  return (
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.title} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media("<=tablet")} {
    --autofit-grid-item-size: 30rem;
  }

  ${media("<=phone")} {
    --autofit-grid-item-size: 100%;
  }
`;
