"use client";
// PricingTablesSection.tsx
import React from 'react';
import styled from 'styled-components';
import AutofitGrid from '@/components/AutofitGrid';
import PricingCard from '@/components/PricingCard';
import SectionTitle from '@/components/SectionTitle';



export default function PricingTablesSection() {
  // Function to get the cookie by name
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };


  const PREMIUM_PLAN_ID = process.env.NEXT_PREMIUM_PLAN_ID;
  const ENTERPRISE_PLAN_ID = process.env.NEXT_ENTERPRISE_PLAN_ID;
  const PROFESSIONAL_PLAN_ID = process.env.NEXT_PROFESSIONAL_PLAN_ID;
  

  // console.log('Access Token 123:', getAccessToken);
  const pricingPlans = [
    {
      title: 'Professional Plan',
      description: 'Give us a try for free',
      benefits: [
        'Core data sets',
        'Sentiment analysis',
        'Real-time alerts',
        'Customizable dashboard'
        
      ],
      price: '$299.00',
      isOutlined: false,
      priceId:PROFESSIONAL_PLAN_ID || ''
    },
    {
      title: 'Premium Plan',
      description: 'Best for individual designers',
      benefits: [
        'Premium data sets',
        'Advanced analytics',
        'Predictive modeling',
        'API integration'
      ],
      price: '$599.00',
      isOutlined: true,
      priceId:PREMIUM_PLAN_ID || ''
    },
    {
      title: 'Enterprise Plan',
      description: 'Get your team together',
      benefits: [
        'Unlimited data access',
        'Bespoke solutions',
        'Premium support & deployment',
        'Tailored onboarding'
      ],
      price: '$999.00',
      isOutlined: false,
      priceId:ENTERPRISE_PLAN_ID || ''
    },
  ];
  return (
    <Wrapper>
      <SectionTitle>Flexible pricing for agile teams</SectionTitle>
      <AutofitGrid>
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title} 
            description={plan.description}
            benefits={plan.benefits}
            isOutlined={plan.isOutlined}
            priceId={plan.priceId}
          >
            {plan.price}
            <span>/month</span>
          </PricingCard>
        ))}
      </AutofitGrid>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;

// Fetching the cookies on the server-side
export async function getServerSideProps(context: any) {
  const { req } = context;
  const accessToken = req.cookies.access || null; // Fetch access cookie from request

  console.log("ACCESS_TOKEN_USER", req.cookies);
  
  return {
    props: {
      accessToken,
    },
  };
}
