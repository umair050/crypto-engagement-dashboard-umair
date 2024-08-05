import React from "react";
import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Charts from "@/components/pages/charts";
import Tables from "@/components/tables/Tables";

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

const Page = () => {
  return (
    <>
      <div className="container position-sticky z-index-sticky top-0"></div>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Sidebar active={1} />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <TopNav active={1} />

          <div>
            <Tables />
          </div>
          <div className="chart-cont">
            <Charts data={dummyData} />
            <br></br>
            <Charts data={dummyData1} />
          </div>
        </main>
      </main>
    </>
  );
};

export default Page;
