import React from "react";
import { BsClock } from "react-icons/bs";
import { convertTimestamp } from "@/utils/convertTimestamp";
import Link from "next/link";

const PromotionCard = ({ promotion }) => {
  // Replace feature_image_url if it is null or empty
  const imageUrl =
    promotion.feature_image_url ||
    "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png";

  return (
    <Link href={`/promotion/${promotion.id}`}>
      <div className="w-[302px] h-[298px] md:w-[150px] md:h-[298px] lg:w-[302px] lg:h-[298px]">
        <div className="w-full h-[184px]">
          <img
            src={
              promotion.feature_image_url &&
              promotion.feature_image_url.length > 0
                ? promotion.feature_image_url
                : "https://bronzebaxxtanning.com/wp-content/uploads/promo-placeholder.jpg"
            }
            alt={promotion.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="py-2">
          <div className="flex items-center text-font_color">
            <BsClock />
            <p className="ml-2 text-font_color">
              {convertTimestamp(promotion.start_date)} -{" "}
              {convertTimestamp(promotion.end_date)}
            </p>
          </div>
          <p className="font-bold text-font_color">{promotion.title}</p>
          <p className="text-font_color">{promotion.location}</p>
          <div className="flex items-center">
            <p className="mr-2 line-through text-font_color">
              ${promotion.old_price}
            </p>
            <p className="mr-2 font-bold text-font_color">
              ${promotion.discount_price}
            </p>
            <p className="bg-lightBlue rounded-[4px] p-1 text-xs text-blue font-bold">
              {promotion.discount_percentage}% OFF
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromotionCard;
