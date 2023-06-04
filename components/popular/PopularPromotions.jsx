import React from "react";
import { Promotions } from "./Promotions";
import PromotionCard from "./PromotionCard";

const PopularPromotions = () => {
  return (
    <div className="m-4 flex justify-center">
      <div>
        <h1 className="my-8 text-2xl font-bold">Check other popular deals</h1>
        <div>
          <div className="grid grid-cols-4 gap-8">
            {Promotions.map((promotion) => {
              return <PromotionCard promotion={promotion} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPromotions;
