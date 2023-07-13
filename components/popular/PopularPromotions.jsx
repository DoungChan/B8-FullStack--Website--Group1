import React from "react";
import { Promotions } from "./Promotions";
import PromotionCard from "./PromotionCard";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { promotionsAtom } from "@/state/recoilAtoms";
import CustomPagination from "../pagination/CustomPagination";
import { useRouter } from "next/router";
const PopularPromotions = ({ promotionsData, error }) => {
  const router = useRouter();
  const [promotions, setPromotions] = useRecoilState(promotionsAtom);

  useEffect(() => {
    if (error) {
      router.push("/500");
    } else {
      if (promotionsData) {
        setPromotions(promotionsData.data);
      }
    }
  }, [promotionsData, setPromotions, error, router]);

  return (
    <div>
      {error ? (
        <></>
      ) : (
        <div className="py-10">
          <div className="m-4 flex justify-center">
            <div>
              <div className="flex flex-row">
                <h1 className="my-8 text-2xl font-bold text-font_color">
                  Check other{" "}
                  <span className="underline underline-offset-8 decoration-softPurple decoration-8">
                    popular deals
                  </span>
                </h1>
              </div>

              <div>
                <div className="inline-grid grid-cols-1 min-[1025px]:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                  {promotionsData.data.map((promotion, index) => {
                    return <PromotionCard promotion={promotion} key={index} />;
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <CustomPagination
        resPerPage={24}
        promotionsCount={promotionsData.totalElements}
      /> */}
        </div>
      )}
    </div>
  );
};

export default PopularPromotions;
