// "use client";

// import { LineChart } from "@/components/charts/Chart";
// import Loader from "@/components/UI/loader";
// import { useFetchCharts } from "@/hooks/useFetchChart";
// import React from "react";

// const data = () => {
//   const { data, loading, error } = useFetchCharts();
//   return (
//     <>
//       {loading && <Loader />}
//       {!loading && (error || !data) && <>Error in Fetch Charts</>}
//       {!loading && !error && data && (
//         <>
//           {Object.keys(data).length > 0 &&
//             Object.keys(data).map((item: any, idx) => {
//               if (
//                 data[item] === null ||
//                 data[item] === undefined ||
//                 data[item].prices === null ||
//                 data[item].prices === null
//               )
//                 return null;
//               return (
//                 <div key={idx}>
//                   <div style={{}}>{item}</div>
//                   <LineChart
//                     dates={data[item].dates}
//                     prices={data[item].prices}
//                   />
//                 </div>
//               );
//             })}
//         </>
//       )}
//     </>
//   );
// };

// export default data;

import React from "react";
import { LineChart } from "@/components/charts/Chart";

interface ChartData {
  dates: string[];
  prices: number[];
}

interface ChartsProps {
  data: {
    [key: string]: ChartData;
  };
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  return (
    <>
      {Object.keys(data).length > 0 &&
        Object.keys(data).map((item, idx) => {
          if (
            data[item] === null ||
            data[item] === undefined ||
            data[item].prices === null ||
            data[item].prices === undefined
          )
            return null;
          return (
            <div key={idx}>
              <div>{item}</div>
              <LineChart dates={data[item].dates} prices={data[item].prices} />
            </div>
          );
        })}
    </>
  );
};

export default Charts;
