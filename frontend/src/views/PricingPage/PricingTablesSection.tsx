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

  // const getAccessToken = getCookie('access');



  // console.log('Access Token 123:', getAccessToken);
  const pricingPlans = [
    {
      title: 'Professional Plan',
      description: 'Give us a try for free',
      benefits: ['1 seat', '1 active project', 'Unlimited viewers', '10 blocks'],
      price: '$299.00',
      isOutlined: false,
      priceId:"price_1Q8znLLtIWiOvjKvjvu9JxxY"
    },
    {
      title: 'Premium Plan',
      description: 'Best for individual designers',
      benefits: [
        '1 seat',
        '3 active projects',
        'Unlimited viewers',
        '100 blocks',
        'CSV Downloader',
        'Password protection',
      ],
      price: '$599.00',
      isOutlined: true,
      priceId:"price_1Q8znrLtIWiOvjKvIwWqxpbc"
    },
    {
      title: 'Enterprise Plan',
      description: 'Get your team together',
      benefits: [
        '10 seats',
        '10 active projects',
        'Unlimited viewers',
        'Unlimited blocks',
        'CSV Downloader',
        'Password protection',
        'Customization',
      ],
      price: '$999.00',
      isOutlined: false,
      priceId:"price_1Q8zoaLtIWiOvjKvHSdBdow7"
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
