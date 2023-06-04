import React from "react";
import { BsClock } from "react-icons/bs";

const PromotionCard = ({ promotion }) => {
  return (
    <div className="w-[302px] h-[298px]">
      <div className="w-full h-[184px]">
        <img
          src={promotion.feature_image_url}
          alt={promotion.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="py-2">
        <div className="flex items-center">
          <BsClock />
          <p className="ml-2">
            {promotion.start_date} - {promotion.end_date}
          </p>
        </div>
        <p className="font-bold">{promotion.title}</p>
        <p>{promotion.location}</p>
        <div className="flex items-center">
          <p className="mr-2 line-through">${promotion.old_price}</p>
          <p className="mr-2 font-bold">${promotion.discount_price}</p>
          <p className="bg-lightblue rounded-[4px] p-1 text-xs">
            {promotion.discount_percentage}% OFF
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
