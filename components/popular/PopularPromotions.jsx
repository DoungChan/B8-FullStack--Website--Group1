import React from "react";
import { Promotions } from "./Promotions";
import PromotionCard from "./PromotionCard";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { promotionsAtom } from "@/state/recoilAtoms";
import CustomPagination from "../pagination/CustomPagination";

const PopularPromotions = ({ promotionsData }) => {
  const [promotions, setPromotions] = useRecoilState(promotionsAtom);

  useEffect(() => {
    setPromotions(promotionsData);
  }, [promotionsData.data, setPromotions]);

  return (
    <div className="py-10">
      <div className="m-4 flex justify-center">
        <div>
          <h1 className="my-8 text-2xl font-bold text-font_color">
            Check other popular deals
          </h1>
          <div>
            <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
              {promotionsData.data.map((promotion, index) => {
                return <PromotionCard promotion={promotion} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <CustomPagination
        resPerPage={24}
        promotionsCount={promotionsData.totalElements}
      />
    </div>
  );
};

export default PopularPromotions;
