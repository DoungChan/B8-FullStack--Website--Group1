import Image from "next/image";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { promotionsAtom } from "@/state/recoilAtoms";

export default function Feature({ promotionsData }) {
  const [promotions, setPromotions] = useRecoilState(promotionsAtom);
  useEffect(() => {
    setPromotions(promotionsData.data);
  }, [promotionsData, setPromotions]);

  console.log("promotionsData:", promotionsData.data);

  return (
    <div className="mt-28 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Hey, check out today&#39;s hottest promotions
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {promotionsData &&
          promotionsData.data.map((promotion, index) => (
            <div className="p-2" key={index}>
              <Image
                src={promotion.feature_image_url}
                width={418}
                height={232}
                alt="image"
                className="rounded-md"
              />
              <div className="flex flex-col flex-wrap pt-3">
                <div className="flex flex-row">
                  <Image
                    src="/icon/time.svg"
                    width={23}
                    height={23}
                    alt="timeIcon"
                  />
                  <p className="pl-2 text-base text-gray">
                    {promotion.start_date}
                  </p>
                </div>
                <div className="text-lg font-bold">{promotion.title}</div>
                <div className="text-base">{promotion.location}</div>
                <div className="flex flex-row pt-1 items-center">
                  <div className="flex flex-row text-xl">
                    <div className="line-through">{promotion.old_price}</div>
                    <div className="font-bold px-1">
                      {promotion.discount_price}
                    </div>
                  </div>
                  <div className="pl-1">
                    <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                      {promotion.discount_percentage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
