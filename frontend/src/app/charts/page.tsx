import TopNav from "@/components/Navigation/TopNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Charts from "@/components/pages/charts";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Sidebar active={1} />
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <TopNav active={1} />
      <div className="chart-cont">

      <Charts/>

        </div>
      </main>

    </main>
  );
}
