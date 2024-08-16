
import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { BarChart } from "@/components/charts/Chart";
import Charts from "@/components/pages/charts";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function Home() {
  const access = cookies().get("access")

  if (!access) {
    return <></>
  }
  let res_table;
  try {
    res_table = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/home/analysis`, { headers: { "Authorization": `Bearer ${access.value}` } });
    console.log('res_table',res_table)

  } catch (e: any) {
    console.log(e)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar active={-1} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <TopNav active={-1} />
        <div className="chart-cont">
          {res_table && res_table.data.coin_data.map((item: any, idx: number) => (
              <Link key={idx} href={`/coins-details/${item.coin}`}>
              <div style={{}}>{item.coin}</div>
              <div>
                <BarChart coinData={item} />
              </div>
            </Link>
          ))}
          {/* <Charts /> */}
        </div>
      </main>
    </main>
  );
}
