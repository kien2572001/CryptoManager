//lazy load chart
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PortfolioChart({ coins }) {
  const options = {
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
    labels: coins.map((coin) => coin.symbol),
  };

  const series = coins.map(
    (coin) => Number.parseFloat(coin.amount) * Number.parseFloat(coin.costPrice)
  );

  return (
    <div className="h-full flex items-center justify-left">
      <Chart
        options={options}
        series={series}
        width="500px"
        type="donut"
        style={{ color: "#ffffff" }}
      />
    </div>
  );
}
