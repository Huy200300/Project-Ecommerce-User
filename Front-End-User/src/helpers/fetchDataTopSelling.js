import SummaryAip from "../common";

const fetchDataTopSelling = async (selectedCategory, limit = 3) => {
  const res = await fetch(
    `${SummaryAip.filter_top_selling.url}?category=${selectedCategory}&limit=${limit}`,
    {
      method: SummaryAip.filter_top_selling.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const dataApi = await res?.json();
  return dataApi;
};

export default fetchDataTopSelling;
