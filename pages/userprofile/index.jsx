import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import callApi from "@/services/apiCalling";
import PromotionCard from "@/components/popular/PromotionCard";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Head from "next/head";
import { refetchPostPromotionsAtom } from "@/state/refetchDataAtoms.js";
import { useRecoilState } from "recoil";
import { CardSkeleton } from "@/components/popular/CardSkeleton";
import clientApiClient from "@/utils/clientApiClient";
const UserProfile = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("post");
  const [savedPromotions, setSavedPromotions] = useState([]);
  const [postedPromotions, setPostedPromotions] = useState([]);
  const [refetchPostPromotions, setRefetchPostPromotions] = useRecoilState(
    refetchPostPromotionsAtom
  );

  useEffect(() => {
    callApi("/posted_promotion/get", "GET")
      .then((res) => {
        setPostedPromotions(res.data);
      })
      .catch((err) => {
        throw err;
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [refetchPostPromotions]);
  useEffect(() => {
    async function getSavedPromotions() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      const url = "api/promotion/saved/get";

      clientApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      const response = await clientApiClient.get(url);
      setSavedPromotions(response.data.data);
    }

    getSavedPromotions();
  }, [setSavedPromotions]);
  const filterSavedPromotions = savedPromotions?.filter(
    (items) => items !== null
  );
  return (
    <ProtectedRoute>
      <Head>
        <title>Profile | Promokh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="min-h-screen p-11">
        <div className="m-16">
          <div>
            <h1 className="my-8 text-2xl font-bold text-font_color">
              My Profile 💜
            </h1>
            <div className="flex">
              <div onClick={() => setActive("post")} className="cursor-pointer">
                <h3
                  className={`${
                    active === "post" && "font-bold"
                  } mr-12 text-font_color`}
                >
                  My posts
                </h3>
              </div>
              <div onClick={() => setActive("save")} className="cursor-pointer">
                <h3
                  className={`${
                    active === "save" && "font-bold"
                  } text-font_color`}
                >
                  Saved Collections
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <hr className="h-[2px] bg-black"></hr>
          </div>
          <div className="mt-6 justify-center">
            {isLoading ? (
              <>
                <CardSkeleton />
              </>
            ) : (
              <>
                {active === "post" ? (
                  postedPromotions?.length === 0 ? (
                    <div className="flex justify-center pt-20">
                      <div className="flex flex-col items-center">
                        <Image
                          src="/icon_images/NoPostedPromo.png"
                          width={130}
                          height={130}
                          alt="No_Post_Promo"
                        />
                        <p className="font-bold mt-4 mb-2 text-font_color">
                          No Promotion found
                        </p>
                        <p className="mx-2 text-sub_font_color">
                          Looking for a way to promote your product or service?
                        </p>
                        <p className="mx-2 text-sub_font_color">
                          Post your promotion here!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                      {postedPromotions &&
                        postedPromotions.map((promotion, index) => {
                          return (
                            <PromotionCard
                              promotion={promotion}
                              key={index}
                              postPromo={true}
                            />
                          );
                        })}
                    </div>
                  )
                ) : filterSavedPromotions?.length === 0 ? (
                  <div className="flex justify-center pt-20">
                    <div className="flex flex-col items-center">
                      <Image
                        src="/icon_images/NoSavedPromo.png"
                        width={200}
                        height={200}
                        alt="No_Post_Promo"
                      />
                      <p className="font-bold mt-4 mb-2 text-font_color">
                        Saved Promotion Now!
                      </p>
                      <p className="mx-2 text-sub_font_color">
                        Save your favorite promotions for easy access later.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    {filterSavedPromotions &&
                      filterSavedPromotions.map((promotion, index) => {
                        return (
                          <PromotionCard promotion={promotion} key={index} />
                        );
                      })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserProfile;
