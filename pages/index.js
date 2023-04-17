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
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}

export default function dashbroad({ data }) {
  return (
    <MainLayout>
      <Dashbroad portfolio={data.data} />
    </MainLayout>
  );
}
