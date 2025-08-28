import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCardProduct from "../components/verticalCardProduct";
import SearchResultDisplay from "../components/SearchResultDisplay";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("query", query.search);
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      credentials: "include",
    });
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setLoading(false);
    console.log("dataResponse frontened", dataResponse);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading.....</p>}
      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>
      {data.length === 0 && !loading && (
        <p className="text-lg  bg-white p-4 text-center">No Data Found</p>
      )}
      {data.length != 0 && !loading && (
        <SearchResultDisplay laoding={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
