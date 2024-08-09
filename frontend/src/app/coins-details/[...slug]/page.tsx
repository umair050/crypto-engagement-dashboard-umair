import React from "react";
import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Tables from "@/components/tables/Tables";
import { LineChart } from "@/components/charts/Chart";

const Status = {
  fraudulent: false, // true or false
  valid: true, // true or false
};

const data = {
  bot_ratio: 0.9,
  coin: "btc",
  dates: [
    "07-10",
    "07-11",
    "07-12",
    "07-13",
    "07-14",
    "07-15",
    "07-16",
    "07-17",
    "07-18",
    "07-19",
    "07-20",
    "07-21",
    "07-22",
    "07-23",
    "07-24",
    "07-25",
    "07-26",
    "07-27",
    "07-28",
    "07-29",
    "07-30",
    "07-31",
    "08-01",
    "08-02",
    "08-03",
    "08-04",
    "08-05",
    "08-06",
    "08-07",
    "08-08",
    "08-09",
  ],
  hype_to_market_cap: 8.794705957161594e-12,
  market_cap: 1137047679445.9429,
  mentions: 10,
  one_month_prediction: [57532.665872266596],
  one_year_prediction: [63512.665872266596],
  prices: [
    57725.78, 57348.75, 57913.68, 59231.06, 60818.77, 64765.55, 65087.61,
    64096.64, 63981.43, 66708.49, 67163.86, 68176.98, 67567.71, 65939.83,
    65375.53, 65794, 67925.17, 67904.55, 68252.75, 66782.78, 66180.04, 64617.83,
    65300.21, 61422.3, 60679.28, 58135.89, 54031.82, 56057.67, 55130.45,
    61708.53, 60416.73,
  ],
  sentiment_score: "Neutral sentiment",
  virality_score: 0.0,
  volume_dates: [
    1720569600, 1720656000, 1720742400, 1720828800, 1720915200, 1721001600,
    1721088000, 1721174400, 1721260800, 1721347200, 1721433600, 1721520000,
    1721606400, 1721692800, 1721779200, 1721865600, 1721952000, 1722038400,
    1722124800, 1722211200, 1722297600, 1722384000, 1722470400, 1722556800,
    1722643200, 1722729600, 1722816000, 1722902400, 1722988800, 1723075200,
    1723161600,
  ],
  volume_from: [
    28064.27, 29764.17, 27242.71, 13963.3, 20080.87, 43679.34, 38850.8,
    28170.64, 21904.27, 33756.81, 12566.25, 18123.31, 26712.99, 29465.67,
    21576.01, 29473.48, 24567.97, 26420.73, 11980.7, 33524.03, 24376.6,
    24304.84, 37045.09, 40943.43, 26176.07, 28092.97, 117153.32, 44255.76,
    39691.91, 48215.66, 11275.17,
  ],
  volume_to: [
    1631984559.89, 1729366992.27, 1567843358.24, 819172857.7, 1207899406.9,
    2752990856.54, 2492930912.34, 1830962929.69, 1405605268.54, 2214983951.52,
    840850489.36, 1219084237.52, 1805561349.3, 1958486045.34, 1426727978.64,
    1902596712.12, 1654021251.63, 1801405015.15, 812380984.29, 2292001706.95,
    1614525200.12, 1601329476.94, 2364449721.14, 2601345982.92, 1596127875.28,
    1665780997.48, 6220425122.88, 2473716223.17, 2232435439.52, 2834182014.44,
    688541814.39,
  ],
};
// Function to get the current month name and the next month name
// Function to get the current month name and the next month name
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
function generatePrices(targetValue: number) {
  return [0, targetValue];
}

// Get the current and next month names
const { currentMonthName, nextMonthName } = getMonthNames();

// Define the dates (month names) for the chart
const chartDates = [currentMonthName, nextMonthName];

// Directly assign the prices from 0 to the prediction value
const prices = generatePrices(data.one_month_prediction[0]);

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

// Function to create an array with only the start value (0) and the prediction value
function generateYearlyPrices(targetValue: number) {
  return [0, targetValue];
}

// Get the first and last month-year labels for the chart
const chartYearlyDates = getMonthYearLabels();

// Generate the prices with only 0 and the prediction value
const yearlyPrices = generateYearlyPrices(data.one_year_prediction[0]);

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

const Page = () => {
  return (
    <>
      <div className="container position-sticky z-index-sticky top-0"></div>

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
            {/* <Charts data={dummyData} /> */}

            <div className="chart-cont">
              <div>
                <div>Monthly Prediction</div>
                <LineChart dates={chartDates} prices={prices} />
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
                <LineChart dates={""} prices={""} />
              </div>
            </div>

            {/* <Charts data={dummyData1} /> */}
          </div>
        </main>
      </main>
    </>
  );
};

export default Page;
