import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SearchResultDisplay from "../components/SearchResultDisplay";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  console.log("urlCategoryListInArray", urlCategoryListInArray);
  console.log("urlCategoryListObject", urlCategoryListObject);

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };
  console.log("data", data);

  const handleSelectedCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
    // console.log('selected category',selectCategory)
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
    //format for url chang
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
    console.log("url format", urlFormat.join(""));
    console.log("category array", arrayOfCategory);
  }, [selectCategory]);

  // {params?.categoryName}

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className=" container mx-auto p-4">
      {/**desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/**left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sort by */}
          <div className="">
            <h3 className="text-base font-medium text-slate-500 border-b border-slate-300">
              Sort By
            </h3>
            <form className="text-sm flex flex-col py-2 gap-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value={"asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base font-medium text-slate-500 border-b border-slate-300">
              Filter By
            </h3>
            <form className="text-sm flex flex-col py-2 gap-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectedCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/**right side */}
        <div className="overflow-y-scroll min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] px-4">
          <p className="font-medium text-lg text-slate-800 my-2">
            Search Results : {data.length}
          </p>
          <div>
            {data.length !== 0 && (
              <SearchResultDisplay data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
