import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { promotionDetailAtom } from "@/state/recoilAtoms";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { useRouter } from "next/router";
import { neutral } from "tailwindcss/colors";
const PromotionDtail = ({ promotionData, error }) => {
  const router = useRouter();
  const [isHoveredSavePromotiom, setIsHoveredSavePromotiom] = useState(false);
  const [isHoveredGetPromotion, setIsHoveredGetPromotion] = useState(false);
  const [promotionDetailData, setPromotionDetailData] =
    useRecoilState(promotionDetailAtom);
  const promtiondata = useRecoilValue(promotionDetailAtom);
  const handleHoverSavePromotion = () => {
    setIsHoveredSavePromotiom(!isHoveredSavePromotiom);
  };
  const handleHoverGetPromotion = () => {
    setIsHoveredGetPromotion(!isHoveredGetPromotion);
  };

  useEffect(() => {
    if (promotionData) {
      setPromotionDetailData(promotionData);
    }
  }, [promotionData]);

  const handleGetPromotion = () => {
    if (promotionData.promotion_detail.image_url_list === "") {
      alert("No promotion url");
    } else {
      window.open(promotionData.promotion_detail.image_url_list);
    }
  };
  return (
    <div className="mx-10">
      <div>
        {promotionData.promotion_detail === null ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-30px md:text-3xl font-bold text-font_color mb-4">
              There is no information available
            </h1>
            <div>
              <Image src="/404.png" width={500} height={500} />
            </div>
          </div>
        ) : (
          <div>
            <section className="">
              <div className="flex flex-col md:flex-col lg:flex-row w-full md:gap-[50px] gap-0">
                <div className="w-full md:w-3/1 lg:w-3/1">
                  <h1 className="text-2xl font-bold text-start text-font_color mt-28 lg:md-20">
                    {promotionData.promotion.title}
                  </h1>
                  <button
                    className="flex w-full justify-start items-center"
                    role="menuitem"
                  >
                    <Image
                      src={"/location.svg"}
                      className="w-4 h-4"
                      alt="Love"
                      width={24}
                      height={24}
                    />
                    <p className="text-primary font-sans font-thin text-sm pl-2">
                      {promotionData.promotion.location}
                    </p>
                  </button>
                  <div className="flex flex-row mt-5 w-full rounded-[15px] overflow-hidden">
                    <Carousel
                      infiniteLoop
                      stopOnHover={true}
                      showThumbs={false}
                    >
                      {promotionData.promotion_detail.image_url_list ===
                      null ? (
                        <div>
                          <img
                            src={
                              "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
                            }
                            alt="Image 1"
                            className="object-cover w-full h-[425px] rounded-[15px]"
                          />
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <img
                            src={promotionData.promotion_detail.image_url_list}
                            alt="Image 1"
                            className="object-cover w-full h-[425px] rounded-[15px]"
                          />
                        </div>
                      )}
                    </Carousel>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 mt-3 lg:mt-20 ">
                  <div className="flex flex-row lg:mt-10">
                    <Image
                      src={"/time_primcolor.svg"}
                      className="w-4 h-4"
                      alt="Love"
                      width={24}
                      height={24}
                    />
                    <p className="text-primary font-sans font-thin text-sm pl-2">
                      {convertTimestamp(
                        promotionData.promotion_detail.created_date
                      )}
                    </p>
                  </div>
                  <div className="py-[20px]">
                    <h1 className="text-font_color font-sans pb-3">Detail</h1>
                    <p className="text-sub_font_color font-sans font-thin text-sm">
                      {promotionData.promotion_detail.promotion_detail}
                    </p>
                  </div>
                  <div className="">
                    <h1 className="text-font_color font-sans pb-3">Contact</h1>
                    <p className="text-sub_font_color font-sans font-thin text-sm">
                      Tel: {promotionData.promotion_detail.contact_number}
                    </p>
                    <p className="text-sub_font_color font-sans font-thin text-sm">
                      FackBook : {promotionData.promotion_detail.facebook_name}
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <button
                      className={`${
                        isHoveredSavePromotiom
                          ? "bg-primary text-white"
                          : "bg-transparent text-primary"
                      } flex justify-center items-center font-sans font-semibold text-sm h-[58px] rounded-[10px] mt-10 border-primary border duration-500 hover:text-white hover:bg-primary`}
                      onMouseEnter={handleHoverSavePromotion}
                      onMouseLeave={handleHoverSavePromotion}
                    >
                      <Image
                        src={
                          isHoveredSavePromotiom
                            ? "/whitelove.svg"
                            : "/love.svg"
                        }
                        className="w-4 h-4 mr-2"
                        alt="Love"
                        width={24}
                        height={24}
                      />
                      Save Promotion
                    </button>
                    <button
                      className={`duration-500 flex justify-center items-center  font-sans font-semibold text-sm h-[58px] rounded-[10px] mt-2 border-primary border ${
                        isHoveredGetPromotion
                          ? "bg-primary text-white"
                          : " bg-transparent text-primary"
                      }`}
                      onClick={() => handleGetPromotion()}
                      onMouseEnter={handleHoverGetPromotion}
                      onMouseLeave={handleHoverGetPromotion}
                    >
                      Get Promotion
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-10 mb-20">
              <div className="flex flex-col w-full mt-10">
                <h1 className="text-font_color text-2xl font-bold font-sans pb-3">
                  Share This Deal
                </h1>
                <div className="flex flex-row w-full gap-4">
                  <Image
                    src={"/facebook.svg"}
                    alt="Facebook"
                    width={40}
                    height={40}
                  />
                  <Image
                    src={"/twitter.svg"}
                    alt=" Twitter"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// getserver side props
export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const { id } = context.query;

  try {
    const res = await fetch(
      `${urlApi}/promotion_detail/get?promotion_id=${id}`,
      {
        headers: {
          "api-token": `${api_token}`,
        },
      }
    );

    const data = await res.json();
    console.log(data.status);
    if (data.status !== 200) {
      return {
        notFound: true,
      };
    }

    const promotionData = data.data;
    return {
      props: {
        promotionData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: true,
      },
    };
  }
};

export default PromotionDtail;
