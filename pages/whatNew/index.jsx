import React, { useEffect } from "react";
import PromotionCard from "@/components/popular/PromotionCard";
import { Promotions } from "@/components/popular/Promotions";
import { searchAtom } from "@/state/recoilAtoms";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import CustomPagination from "@/components/pagination/CustomPagination";

import Head from "next/head";
import { SearchNotFound } from "@/components/search-notFound/SearchNotFound";
const WhatNew = ({ data, error }) => {
  const router = useRouter();
  const query = router.query.search || "";

  const searchValue = useRecoilValue(searchAtom);

  const title =
    query === "" ? "What's new" : `Search result for "${searchValue}"`;
  return (
    <>
      <Head>
        <title>What New | PromoKh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {error ? (
        () => router.push("/500")
      ) : (
        <>
          {data?.data?.length === 0 ? (
            <SearchNotFound />
          ) : (
            <div className="py-10">
              <div className="my-20 sm:my-10 flex justify-center">
                <div>
                  <h1 className="my-8 text-2xl font-bold text-font_color">
                    Check all{" "}
                    <span className="underline underline-offset-8 decoration-softPurple decoration-4">
                      Promotions
                    </span>
                    
                  </h1>
                  <div>
                    <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {data?.data?.map((promotion, index) => {
                        return (
                          <PromotionCard promotion={promotion} key={index} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <CustomPagination
                resPerPage={16}
                promotionsCount={data.totalElements}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const searchValue = context.query.search || "";
  const page = context.query.page || 1;
  const size = context.query.size || 16;
  const apiPage = page - 1;
  if (searchValue === "") {
    try {
      const res = await fetch(
        `${urlApi}/promotion/get?category_id=&page=${apiPage}&size=${size}`,
        {
          headers: {
            "api-token": `${api_token}`,
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
  } else {
    try {
      const res = await fetch(
        `${urlApi}/promotion/search?query=${searchValue}`,
        {
          headers: {
            "api-token": `${api_token}`,
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
  }
};

export default WhatNew;
