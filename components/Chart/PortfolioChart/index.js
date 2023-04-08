//lazy load chart
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PortfolioChart() {
  const options = {
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
  };

  const series = [44, 55, 13, 43, 22];

  const labels = ["BTC", "ETH", "BNB", "ADA", "XRP"];

  return (
    <div className="h-full flex items-center justify-left">
      <Chart
        options={options}
        series={series}
        width="500px"
        type="donut"
      />
    </div>
  );
}
