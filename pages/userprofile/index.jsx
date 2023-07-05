import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import callApi from "@/services/apiCalling";
import PromotionCard from "@/components/popular/PromotionCard";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Head from "next/head";
const UserProfile = ({ data }) => {
  const [active, setActive] = useState("post");
  const [savedPromotions, setSavedPromotions] = useState([]);
  const [postedPromotions, setPostedPromotions] = useState([]);

  useEffect(() => {
    callApi("/saved_promotion/get", "GET")
      .then((res) => {
        setSavedPromotions(res.data);
      })
      .catch((err) => {
        throw err;
      });
    callApi("/posted_promotion/get", "GET")
      .then((res) => {
        setPostedPromotions(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <ProtectedRoute>
      <Head>
        <title>Profile | Promokh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="min-h-screen p-11">
        <div>
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
            <hr class="h-[2px] bg-black"></hr>
          </div>
          <div className="mt-6">
            {active === "post" ? (
              <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
                {postedPromotions &&
                  postedPromotions.map((promotion, index) => {
                    return <PromotionCard promotion={promotion} key={index} />;
                  })}
              </div>
            ) : (
              <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
                {savedPromotions &&
                  savedPromotions.map((promotion, index) => {
                    return <PromotionCard promotion={promotion} key={index} />;
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserProfile;
