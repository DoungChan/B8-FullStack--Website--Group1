import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import callApi from "@/services/apiCalling";
import PromotionCard from "@/components/popular/PromotionCard";

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
    <div className="min-h-screen p-20">
      <div>
        <div>
          <h1 className="my-8 text-2xl font-bold text-font_color">
            Your Promotions
          </h1>
          <div className="flex">
            <div onClick={() => setActive("post")} className="cursor-pointer">
              <h3 className={`${active === "post" && "font-bold"} mr-12`}>
                Your Posts
              </h3>
            </div>
            <div onClick={() => setActive("save")} className="cursor-pointer">
              <h3 className={`${active === "save" && "font-bold"}`}>
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
            <div className="">
              {postedPromotions.map((promotion, index) => {
                return <PromotionCard promotion={promotion} key={index} />;
              })}
            </div>
          ) : (
            <div>
              {savedPromotions.map((promotion, index) => {
                return <PromotionCard promotion={promotion} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
