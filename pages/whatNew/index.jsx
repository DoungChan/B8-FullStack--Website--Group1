import React from "react";
import PromotionCard from "@/components/popular/PromotionCard";
import { Promotions } from "@/components/popular/Promotions";
import { searchAtom } from "@/state/recoilAtoms";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
const WhatNew = ({ data }) => {
  const router = useRouter();
  const query = router.query.search || "";

  const searchValue = useRecoilValue(searchAtom);

  const title =
    query === "" ? "What's new" : `Search result for "${searchValue}"`;
  return (
    <div className="m-4 mt-20 flex justify-center">
      <div>
        <h1 className="my-8 text-2xl font-bold text-font_color">{title}</h1>
        <div>
          <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
            {data?.data?.map((promotion, index) => {
              return <PromotionCard promotion={promotion} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const searchValue = context.query.search || "";
  if (searchValue === "") {
    try {
      const res = await fetch(`${urlApi}/promotion/get?category_Id=`, {
        headers: {
          "api-token": `${api_token}`,
        },
      });
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
