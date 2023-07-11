import Image from "next/image";
import Link from "next/link";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { featureAtom } from "@/state/recoilAtoms";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { useRouter } from "next/router";
export default function Feature({ featureData, error }) {
  const router = useRouter();

  const [featurePromotions, setFeaturePromotions] = useRecoilState(featureAtom);

  useEffect(() => {
    if (featureData) {
      setFeaturePromotions(featureData.data);
    }
  }, [featureData, setFeaturePromotions]);

  return (
    <>
      {error ? (
        () => router.push("/500")
      ) : (
        <div className="mt-28 text-font_color">
          <h2 className="font-bold text-2xl px-2 py-4 pb-8 lg:text-left sm:text-center">
            Hey, check out today{" "}
            <span className="underline underline-offset-8 decoration-softPurple decoration-8">
              hottest promotions
            </span>
          </h2>
          <div className="flex flex-row flex-wrap justify-center items-center">
            {featureData &&
              featureData.data
                .filter(
                  (promotion) =>
                    promotion.user_id === "64a671105babe00444cf9fbe"
                )
                .map((promotion, index) => (
                  <div className="p-2" key={index}>
                    <div className="w-[360px] sm:w-[410px] h-[350px]">
                      <div className="relative w-full overflow-hidden bg-cover bg-no-repeat rounded-lg">
                        <div className="w-full h-[232px]">
                          <Link href={`/promotion/${promotion.id}`}>
                            <Image
                              src={promotion.feature_image_url}
                              width={400}
                              height={232}
                              alt="image"
                              className="w-full transition duration-500 ease-in-out hover:scale-110"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col flex-wrap pt-3">
                        <div className="flex flex-row">
                          <Image
                            src="/icon/time.svg"
                            width={23}
                            height={23}
                            alt="timeIcon"
                          />
                          <p className="pl-2 text-base text-gray">
                            {convertTimestamp(promotion.start_date)} -{" "}
                            {convertTimestamp(promotion.end_date)}
                          </p>
                        </div>
                        <div className="text-lg font-bold">
                          {promotion.title}
                        </div>
                        <div className="text-base">{promotion.location}</div>
                        <div className="flex flex-row pt-1 items-center">
                          <div className="flex flex-row text-xl">
                            <div className="line-through">
                              ${promotion.old_price}
                            </div>
                            <div className="font-bold px-1">
                              ${promotion.discount_price}
                            </div>
                          </div>
                          <div className="pl-1">
                            <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                              {promotion.discount_percentage}% OFF
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
