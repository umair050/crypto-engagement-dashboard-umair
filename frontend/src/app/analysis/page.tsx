import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import axios from "axios";
import { BarChart, LineChart } from "@/components/charts/Chart";
import { cookies } from "next/headers";

export default async function Home() {
  const access = cookies().get("access")

  if (!access) {
    return <></>
  }
  let res_table;
  try {
    res_table = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/home/analysis`, { headers: { "Authorization": `Bearer ${access.value}` } });

  } catch (e: any) {
    console.log(e)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar active={0} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <TopNav active={0} />
        <div className="chart-cont">
          {res_table && res_table.data.coin_data.map((item: any, idx: number) => (
            <>

              <div key={idx}>
                <div style={{}}>
                  {item.coin}
                </div>
                <BarChart coinData={item} />
              </div>
            </>
          ))}
        </div>
      </main>

    </main>
  );
}
