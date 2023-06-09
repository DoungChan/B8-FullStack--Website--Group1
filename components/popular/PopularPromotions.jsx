import React from "react";
import { Promotions } from "./Promotions";
import PromotionCard from "./PromotionCard";

const PopularPromotions = () => {
  return (
    <div className="m-4 flex justify-center">
      <div>
        <h1 className="my-8 text-2xl font-bold text-font_color">
          Check other popular deals
        </h1>
        <div>
          <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
            {Promotions.map((promotion, index) => {
              return <PromotionCard promotion={promotion} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPromotions;
