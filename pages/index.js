import Dashbroad from "../components/Dashbroad";
import MainLayout from "../components/Layouts/MainLayout";
import axios from "axios";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("http://localhost:3000/api/portfolio/get", {
    params: {
      name: "Holder",
    },
  });
  const res2 = await axios.get(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );
  const BTCprice = res2.data.price;
  const data = res.data;
  return {
    props: {
      data,
      appData: {
        BTCprice,
      },
    },
  };
}

export default function dashbroad({ data, appData }) {
  return (
    <MainLayout>
      <Dashbroad portfolio={data.data} appData={appData} />
    </MainLayout>
  );
}
