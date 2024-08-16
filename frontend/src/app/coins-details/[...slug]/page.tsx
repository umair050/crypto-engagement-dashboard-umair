import React from "react";
import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Tables from "@/components/tables/Tables";
import { LineChart } from "@/components/charts/Chart";
import { cookies } from "next/headers";
import axios from "axios";

const Status = {
  fraudulent: false, // true or false
  valid: true, // true or false
};

type PageProps = {
  params: {
    [key: string]: string;
  };
};

function getMonthNames() {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = monthNames[currentMonthIndex];
  const nextMonthName = monthNames[(currentMonthIndex + 1) % 12];
  return { currentMonthName, nextMonthName };
}

// Function to create an array that starts from 0 and ends at the prediction value
function generatePrices(currentValue : number,targetValue: number) {
  return [currentValue, targetValue];
}

// Get the current and next month names
const { currentMonthName, nextMonthName } = getMonthNames();

// Define the dates (month names) for the chart
const chartDates = [currentMonthName, nextMonthName];

// Directly assign the prices from 0 to the prediction value

// Function to get only the first and last month-year labels
function getMonthYearLabels() {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const labels = [];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // First label: Current date
  const firstLabel = `${currentDay} ${monthNames[currentMonth]} ${currentYear}`;
  labels.push(firstLabel);

  // Last label: Same date next year
  const nextYearMonthIndex = currentMonth;
  const nextYear = currentYear + 1;
  const lastLabel = `${currentDay} ${monthNames[nextYearMonthIndex]} ${nextYear}`;
  labels.push(lastLabel);

  return labels;
}

// Get the first and last month-year labels for the chart
const chartYearlyDates = getMonthYearLabels();

// Generate the prices with only 0 and the prediction value

const tableData = [
  {
    isBot: "0",
    likes: 0,
    replies: 0,
    retweets: 2,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919096121819333",
  },
  {
    isBot: "0",
    likes: 0,
    replies: 0,
    retweets: 7,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919090773983342",
  },
  {
    isBot: "0",
    likes: 0,
    replies: 0,
    retweets: 6,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919080288555305",
  },
  {
    isBot: "1",
    likes: 0,
    replies: 0,
    retweets: 0,
    sentiment: "negative",
    shares: 0,
    tweet_id: "1821919070209634663",
  },
  {
    isBot: "0",
    likes: 0,
    replies: 0,
    retweets: 272,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919069823758645",
  },
  {
    isBot: "0",
    likes: 10,
    replies: 0,
    retweets: 2,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919069408317575",
  },
  {
    isBot: "0",
    likes: 1,
    replies: 0,
    retweets: 0,
    sentiment: "positive",
    shares: 0,
    tweet_id: "1821919046083682688",
  },
  {
    isBot: "1",
    likes: 0,
    replies: 0,
    retweets: 11,
    sentiment: "positive",
    shares: 0,
    tweet_id: "1821919044334686279",
  },
  {
    isBot: "1",
    likes: 0,
    replies: 0,
    retweets: 10,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919033110790362",
  },
  {
    isBot: "1",
    likes: 0,
    replies: 0,
    retweets: 5,
    sentiment: "neutral",
    shares: 0,
    tweet_id: "1821919028858028037",
  },
];

const Page: React.FC<PageProps> = async ({ params }) => {
  const access = cookies().get("access")
  const coin = params.slug[0]

  if (!access) {
    return <></>
  }
  let response,data,tableData,monthlyPrices,yearlyPrices;
  try {
    response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}coin-details/${coin}`, { headers: { "Authorization": `Bearer ${access.value}` } });
    data = response.data
    if (data === null || (data && data.error)) {
      return <p>No data found for the coin: {coin}.</p>;
    }
    tableData = data.tweets_data

    let lastPrice = data.prices[data.prices.length - 1];

    monthlyPrices = generatePrices(lastPrice,data.one_month_prediction);
    yearlyPrices = generatePrices(lastPrice,data.one_year_prediction);



  } catch (e: any) {
    console.log(e)
  }



  return (
    <>
      <div className="container position-sticky z-index-sticky top-0"></div>
      {data && 
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Sidebar active={1} />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <TopNav active={1} />

          <div>
            <Tables tableProps={tableData} />
          </div>
          <div className="status-bar">
            <div> Status:</div>

            <div
              className={`circle ${
                Status.fraudulent ? "red" : Status.valid ? "green" : ""
              }`}
            ></div>
          </div>
          <div>
            <div className="chart-cont">
              <div>
                <div>Monthly Prediction</div>
                <LineChart dates={chartDates} prices={monthlyPrices} />
              </div>
              <div>
                <div>Yearly Prediction</div>
                <LineChart dates={chartYearlyDates} prices={yearlyPrices} />
              </div>
            </div>
            <div className="chart-cont-3">
              <div>
                <div>Price Performances</div>
                <LineChart dates={data.dates} prices={data.prices} />
              </div>
              <div>
                <div>Trading Volume</div>
                <LineChart
                  dates={data.volume_dates}
                  prices={data.volume_from}
                />
              </div>
              <div>
                <div>Adoption Rate</div>
                <LineChart dates={data.volume_dates} prices={data.adoption_rates} />
              </div>
            </div>
          </div>
        </main>
      </main>
      }
    </>
  );
};

export default Page;