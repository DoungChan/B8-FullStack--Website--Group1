import React from "react";
import { useEffect } from "react";
import PopularPromotions from "@/components/popular/PopularPromotions";
import Navbar from "../components/navbar/Navbar";
import PromotionForm from "../pages/formCreatePromotion";
import Category from "../components/category-feature/Categories";
import HotPromotion from "../components/category-feature/Feature";
import Feature from "../components/category-feature/Feature";
import Head from "next/head";

export default function Home({
  featureData,
  promotionsData,
  categoryData,
  error,
}) {
  return (
    <>
      <Head>
        <title>Home | PromoKh </title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between `}
      >
        <Feature featureData={featureData} error={error} />
        <Category categoryData={categoryData} error={error} />
        <PopularPromotions promotionsData={promotionsData} error={error} />
      </main>
    </>
  );
}
export const getServerSideProps = async ({ query }) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const page = query.page || 0;
  const size = query.size || 24;

  try {
    const [featureRes, promotionsRes, categoryRes] = await Promise.all([
      fetch(`${urlApi}/promotion/get?category_Id=&size=24&page=1`, {
        headers: {
          "api-token": `${api_token}`,
        },
      }),
      fetch(`${urlApi}/promotion/get?category_Id=&page=${page}&size=${size}`, {
        headers: {
          "api-token": `${api_token}`,
        },
      }),
      fetch(`${urlApi}/category`, {
        headers: {
          "api-token": `${api_token}`,
        },
      }),
    ]);
    const [featureData, promotionsData, categoryData] = await Promise.all([
      featureRes.json(),
      promotionsRes.json(),
      categoryRes.json(),
    ]);

    return {
      props: {
        featureData,
        promotionsData,
        categoryData,
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
