"use client"
import styled from 'styled-components';
import Page from '@/components/Page';
import FaqSection from '@/views/PricingPage/FaqSection';
import PricingTablesSection from '@/views/PricingPage/PricingTablesSection';
import React from 'react';

export default function PricingPage() {
  return (
    <PricingTablesSection />
  );
}

const Wrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;
