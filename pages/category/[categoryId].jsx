import { useEffect, useState } from "react";
import PromotionCard from "@/components/popular/PromotionCard";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import { useRecoilState, useRecoilValue } from "recoil";
import { promotionsAtom } from "@/state/recoilAtoms";
import { categoryHomeAtom } from "@/state/recoilAtoms";
import CustomPagination from "@/components/pagination/CustomPagination";
import Head from "next/head";
import { SearchNotFound } from "@/components/search-notFound/SearchNotFound";
import Image from "next/dist/client/image";

const CategoryDetail = ({ data, error }) => {
  const router = useRouter();
  const categoryInformation = useRecoilValue(categoryHomeAtom);
  const [promotionsCategory, setPromotionsCategory] =
    useRecoilState(promotionsAtom);

  useEffect(() => {
    if (data) {
      setPromotionsCategory(data.data); // Update the state with data.data
    }
  }, [data]);

  const categoryId = router.query.categoryId;
  const category = categoryInformation.find(
    (category) => category.id === categoryId
  );
  const categoryName = category ? category.name : "";
  // search function
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // udate filteredData when data.data changes
  useEffect(() => {
    // Update the filteredData whenever data.data changes
    setFilteredData(data.data);
  }, [data.data]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter the data based on the search query
    const filteredResults = data.data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredResults);
  };
  function handleSearchClick() {
    const input = document.getElementById("default-search");
    input.classList.add("animate-pulse");

    // You can also remove the class after a certain time to stop the animation.
    setTimeout(() => {
      input.classList.remove("animate-pulse");
    }, 500); // Remove the class after 0.5 seconds (same as the animation duration)
  }

  return (
    <>
      <Head>
        <title>{categoryName} | PromoKh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {error ? (
        () => router.push("/500")
      ) : (
        <>
          <div className="flex justify-center md:justify-end md:hidden">
            <div className=" mt-20 relative ">
              <input
                type="search"
                id="default-search"
                onChange={handleInputChange}
                className="text-sub_font_color border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none lg:w-96 md:w-60  transition-transform duration-300"
                placeholder="Search a Promotion"
                required
              />
              <Image
                src="/search.svg"
                alt="search"
                width={20}
                height={20}
                className="absolute top-3 right-4"
                onClick={handleSearchClick}
              />
            </div>
          </div>

          <div className=" items-center justify-center w-full">
            <div className="flex justify-center sm:px-10">
              {/* Rest of the category detail page */}
              <div>
                <div className="flex justify-between">
                  <h1 className="my-8 md:mt-24 text-2xl font-bold text-font_color underline underline-offset-8 decoration-softPurple decoration-4">
                    {categoryName}
                  </h1>
                  <div className="flex justify-center sm:justify-end">
                    <div className="m-4 mt-24 relative lg:mr-32 hidden md:inline">
                      <input
                        type="search"
                        id="default-search"
                        onChange={handleInputChange}
                        className="text-sub_font_color border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none lg:w-96 md:w-60 sm:w-40 transition-transform duration-300"
                        placeholder="Search a Promotion"
                        required
                      />
                      <Image
                        src="/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                        className="absolute top-3 right-4"
                        onClick={handleSearchClick}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {filteredData.length === 0 ? (
                    <SearchNotFound />
                  ) : (
                    <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
                      {filteredData.map((promotion, index) => (
                        <PromotionCard promotion={promotion} key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CustomPagination
              resPerPage={24}
              promotionsCount={filteredData.length}
            />
          </div>
        </>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const { categoryId } = context.query;
  const page = context.query.page || 1;
  const size = context.query.size || 24;
  const apiPage = page - 1;

  try {
    const res = await fetch(
      `${urlApi}/promotion/get?category_id=${categoryId}&page=${apiPage}&size=${size}`,
      {
        headers: {
          "api-token": api_token,
        },
      }
    );

    const data = await res.json();

    if (data.status !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
export default CategoryDetail;
