

import React from "react";
import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Charts from "@/components/pages/charts";
import Tables from "@/components/tables/Tables";
import { LineChart } from "@/components/charts/Chart";
import { FC } from 'react';
import { cookies } from "next/headers";
import axios from "axios";


const dummyData = {
  Monthly: {
    dates: ["2023-01-01", "2023-01-02", "2023-01-03"],
    prices: [32000, 33000, 34000],
  },
  Yearly: {
    dates: ["2023-01-01", "2023-01-02", "2023-01-03"],
    prices: [2500, 2600, 2700],
  },

  // Add more coins if needed
};
const dummyData1 = {
  Price_Performance: {
    dates: ["2023-01-01", "2023-01-02", "2023-01-03"],
    prices: [2500, 2600, 2700],
  },
  Trading_vol: {
    dates: ["2023-01-01", "2023-01-02", "2023-01-03"],
    prices: [2500, 2600, 2700],
  },
  Adoption_Rate: {
    dates: ["2023-01-01", "2023-01-02", "2023-01-03"],
    prices: [2500, 2600, 2700],
  },
};


interface PageProps {
  params: {
    [key: string]: any; // Adjust this type based on your actual params structure
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  // Access params here
  const access = cookies().get("access")
  const coin = params.slug[0]
  if (!access) {
    return <></>
  }
  let coin_data;
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}coin-details/${coin}`);
    coin_data = response.data
    console.log('\n')
    console.log('coin_data',coin_data)
  } catch (e: any) {
    console.log(e)
  }


  return (
    <>
      <div className="container position-sticky z-index-sticky top-0"></div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Sidebar active={1} />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <TopNav active={1} />

        {coin_data && 
          <div>
          <div>
            <Tables coin_data = {coin_data}/>
          </div>
          <div className="chart-cont">
            {/* <Charts data={dummyData} /> */}
            <div>Price Performance</div>
            <LineChart dates={coin_data.dates} prices={coin_data.prices} />
            <br></br>
            <div>Trading Volumn</div>
            {/* <LineChart dates={dummyData1['Trading_vol'].dates} prices={dummyData1['Trading_vol'].prices} /> */}
            <br></br>
            <div>Adoption Rate</div>
            {/* <LineChart dates={dummyData1['Adoption_Rate'].dates} prices={dummyData1['Adoption_Rate'].prices} /> */}
            {/* <Charts data={dummyData1} /> */}
          </div>
          </div>
        }
        </main>
      </main>
    </>
  );
};

export default Page;
