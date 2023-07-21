import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRecoilState } from "recoil";
import {
  loginModalAtom,
  profileCardAtom,
  promotionDetailAtom,
  savedPromotionsAtom,
} from "@/state/recoilAtoms";
import {
  FacebookButton,
  FacebookCount,
  TwitterButton,
  TwitterCount,
} from "react-social";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { useRouter } from "next/router";

import clientApiClient from "@/utils/clientApiClient";

import Head from "next/head";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";

const PromotionDtail = ({ promotionData, error }) => {
  const router = useRouter();
  const [isHoveredSavePromotion, setIsHoveredSavePromotion] = useState(false);
  const [isHoveredGetPromotion, setIsHoveredGetPromotion] = useState(false);
  const [isPromotionSaved, setIsPromotionSaved] = useState(false);

  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalAtom);
  const [showProfile, setShowProfile] = useRecoilState(profileCardAtom);
  const [savedPromotions, setSavedPromotions] =
    useRecoilState(savedPromotionsAtom);
  const [promotionDetailData, setPromotionDetailData] =
    useRecoilState(promotionDetailAtom);

  const handleHoverSavePromotion = () => {
    setIsHoveredSavePromotion(!isHoveredSavePromotion);
  };
  const handleHoverGetPromotion = () => {
    setIsHoveredGetPromotion(!isHoveredGetPromotion);
  };

  useEffect(() => {
    function putPromotionData() {
      if (promotionData) {
        setPromotionDetailData(promotionData);
      }
    }
    function handleServerError() {
      if (error === true) {
        router.push("/500");
      }
    }
    putPromotionData();
    handleServerError();
  }, [promotionData, setPromotionDetailData, error, router]);

  useEffect(() => {
    async function getSavedPromotions() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      const url = "api/promotion/saved/get";

      clientApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      const response = await clientApiClient.get(url);

      setSavedPromotions(response.data.data);
    }

    getSavedPromotions();
  }, [setSavedPromotions]);

  useEffect(() => {
    if (savedPromotions.length === 0) return;

    const isSaved = savedPromotions.some((savedPromotion) => {
      return savedPromotion && savedPromotion.id === router.query.id;
    });

    setIsPromotionSaved(isSaved);
  }, [savedPromotions, router.query.id]);

  const handleGetPromotion = () => {
    if (promotionData.promotion_detail.promotion_url === "") {
      alert("No promotion url");
    } else {
      window.open(promotionData.promotion_detail.promotion_url);
    }
  };

  const handleClickSavePromotion = async (event) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setShowProfile(true);
      setShowLoginModal(true);
      return;
    }

    event.preventDefault();

    const deleteUrl = `api/promotion/saved/delete?promotionId=${router.query.id}`;
    const addUrl = "api/promotion/saved/add";

    clientApiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    if (isPromotionSaved) {
      await clientApiClient.delete(deleteUrl);
      setIsPromotionSaved(false);
    } else {
      await clientApiClient.post(addUrl, {
        promotionId: router.query.id,
      });
      setIsPromotionSaved(true);
    }
  };

  let url = `${process.env.NEXT_PUBLIC_DOMIAN_URL}/promotion/${router.query.id}`;
  const postFormat = `Check out the new promotion on PromoKh! ${promotionData.promotion.title} ${url}`;

  // state hover arrow
  const [isIconPrevHovered, setIsIconPrevHovered] = useState(false);
  const [isIconNextHovered, setIsIconNextHovered] = useState(false);

  const handleHoverIconPrev = () => {
    setIsIconPrevHovered(!isIconPrevHovered);
  };
  const handleHoverIconNext = () => {
    setIsIconNextHovered(!isIconNextHovered);
  };

  // Convert timestamp to date
  const endDate = new Date(promotionData.promotion.end_date);
  endDate.setHours(endDate.getHours() + 24);
  const today = new Date();

  const hasExpired = endDate < today;

  return (
    <>
      <Head>
        <title> Promotion Detail | PromoKh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <>
        {error === true ? (
          () => router.push("/500")
        ) : (
          <>
            <div className="mx-10">
              <div>
                {promotionData.promotion_detail === null ? (
                  <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-30px md:text-3xl font-bold text-font_color mb-4">
                      There is no information available
                    </h1>
                    <div>
                      <Image
                        src="/404.png"
                        width={500}
                        height={500}
                        alt="Page not found"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <section className="">
                      <div className="flex flex-col md:flex-col lg:flex-row w-auto md:gap-[50px] gap-0 justify-center ">
                        <div className="w-full lg:w-2/3">
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
                            <p className="text-primary font-sans text-sm pl-2">
                              {promotionData.promotion.location}
                            </p>
                          </button>

                          {promotionData.promotion_detail.image_url_list ===
                          null ? (
                            <>
                              {hasExpired ? (
                                <img
                                  src={"/expired.png"}
                                  className=" sm:object-cover mt-5 w-full min-[439px]:h-[300px] min-[1800px]:h-[600px] h-[200px] sm:h-[425px] md:h-[425px] xl:h-[525px] rounded-[15px] "
                                />
                              ) : (
                                <div className="mt-5 w-full rounded-[15px] overflow-hidden">
                                  <img
                                    src={
                                      "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
                                    }
                                    alt="Image 1"
                                    className="object-cover w-full h-[425px] rounded-[15px]"
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {hasExpired ? (
                                <img
                                  src={"/expired.png"}
                                  className=" sm:object-cover mt-5 w-full min-[439px]:h-[300px] min-[1800px]:h-[600px] h-[200px] sm:h-[425px] md:h-[425px] xl:h-[525px] rounded-[15px] "
                                />
                              ) : (
                                <div className="!w-fit mt-5 rounded-[15px] overflow-hidden shadow-md border-1">
                                  <Carousel
                                    infiniteLoop
                                    stopOnHover={false}
                                    showThumbs={false}
                                    className="w-fit h-fit"
                                    renderArrowPrev={(
                                      onClickHandler,
                                      hasPrev,
                                      label
                                    ) =>
                                      hasPrev && (
                                        <button
                                          onMouseEnter={handleHoverIconPrev}
                                          onMouseLeave={handleHoverIconPrev}
                                          type="button"
                                          onClick={onClickHandler}
                                          title={label}
                                          style={{
                                            position: "absolute",
                                            zIndex: 10,
                                            left: 15,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                          }}
                                        >
                                          {isIconPrevHovered ? (
                                            <Image
                                              src="/previousHover.svg"
                                              alt="Previous"
                                              width={10}
                                              height={10}
                                              className="w-[40px] h-[40px] md:w-16 md:h-16"
                                            />
                                          ) : (
                                            <Image
                                              src="/previous.svg"
                                              alt="Previous"
                                              width={10}
                                              height={10}
                                              className="w-[40px] h-[40px] md:w-16 md:h-16"
                                            />
                                          )}
                                        </button>
                                      )
                                    }
                                    renderArrowNext={(
                                      onClickHandler,
                                      hasNext,
                                      label
                                    ) =>
                                      hasNext && (
                                        <button
                                          onMouseEnter={handleHoverIconNext}
                                          onMouseLeave={handleHoverIconNext}
                                          type="button"
                                          onClick={onClickHandler}
                                          title={label}
                                          style={{
                                            position: "absolute",
                                            zIndex: 10,
                                            right: 15,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                          }}
                                        >
                                          {isIconNextHovered ? (
                                            <Image
                                              src="/nextHover.svg"
                                              alt="Next"
                                              width={10}
                                              height={10}
                                              className="w-[40px] h-[40px] md:w-16 md:h-16"
                                            />
                                          ) : (
                                            <Image
                                              src="/nextArrow.svg"
                                              alt="Next"
                                              width={10}
                                              height={10}
                                              className="w-[40px] h-[40px] md:w-16 md:h-16"
                                            />
                                          )}
                                        </button>
                                      )
                                    }
                                  >
                                    {promotionData.promotion_detail.image_url_list.map(
                                      (image, key) => (
                                        <img
                                          src={image}
                                          alt="Image 1"
                                          key={key}
                                          className="object-contain bg-black bg-opacity-5 min-[439px]:h-[300px] min-[1800px]:h-[600px] h-[200px] sm:h-[425px] md:h-[425px] xl:h-[525px] rounded-[15px]"
                                        />
                                      )
                                    )}
                                  </Carousel>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex flex-col w-full  lg:w-1/3 mt-3 lg:mt-28 ">
                          <div className="flex flex-row lg:mt-10">
                            <Image
                              src={"/time_primcolor.svg"}
                              className="w-4 h-4"
                              alt="Love"
                              width={24}
                              height={24}
                            />
                            <p className="text-primary font-sans text-sm pl-2">
                              {convertTimestamp(
                                promotionData.promotion.start_date
                              )}{" "}
                              -{" "}
                              {convertTimestamp(
                                promotionData.promotion.end_date
                              )}
                            </p>
                          </div>
                          <div className="py-[20px]">
                            <h1 className="text-font_color font-sans pb-3 font-bold">
                              Detail
                            </h1>
                            <p className="text-font_color font-sans">
                              {promotionData.promotion_detail.promotion_detail}
                            </p>
                          </div>
                          <div className="">
                            <h1 className="text-font_color font-sans pb-3 font-bold">
                              Contact
                            </h1>
                            <p className="text-font_color font-sans">
                              Tel:{" "}
                              {promotionData.promotion_detail.contact_number}
                            </p>
                            <p className="text-font_color font-sans">
                              Facebook :{" "}
                              {promotionData.promotion_detail.facebook_name}
                            </p>
                          </div>
                          <div className="flex flex-col w-full">
                            <button
                              className={`${
                                isHoveredSavePromotion
                                  ? "bg-primary opacity-80 text-white"
                                  : "bg-transparent text-primary"
                              } flex justify-center items-center font-sans font-semibold text-sm h-[58px] rounded-[10px] mt-10 border-primary border duration-500 hover:text-white hover:bg-primary`}
                              onMouseEnter={handleHoverSavePromotion}
                              onMouseLeave={handleHoverSavePromotion}
                              onClick={handleClickSavePromotion}
                            >
                              {isPromotionSaved ? (
                                <>
                                  <Image
                                    src={
                                      isHoveredSavePromotion
                                        ? "/heart-off-outline-custom.png"
                                        : "/heart-off-custom.png"
                                    }
                                    className="w-4 h-4 mr-2"
                                    alt="Unsave"
                                    width={24}
                                    height={24}
                                  />
                                  Unsave Promotion
                                </>
                              ) : (
                                <>
                                  <Image
                                    src={
                                      isHoveredSavePromotion
                                        ? "/whitelove.svg"
                                        : "/love.svg"
                                    }
                                    className="w-4 h-4 mr-2"
                                    alt="Love"
                                    width={24}
                                    height={24}
                                  />
                                  Save Promotion
                                </>
                              )}
                            </button>
                            <button
                              className={`duration-500 flex justify-center items-center  font-sans font-semibold text-sm h-[58px] rounded-[10px] mt-2 border-primary border ${
                                isHoveredGetPromotion
                                  ? "bg-primary opacity-80 text-white"
                                  : " bg-primary text-white"
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
                          <FacebookShareButton
                            url={url}
                            quote="Check out the new promotion on PromoKh!"
                          >
                            <Image
                              src={"/facebook.png"}
                              alt="Twitter"
                              className=" cursor-pointer"
                              width={40}
                              height={40}
                            />
                          </FacebookShareButton>

                          <TwitterButton
                            url={postFormat}
                            hashtags={["travel", "adventure"]}
                          >
                            <Image
                              src={"/twitter.png"}
                              alt="Twitter"
                              className=" cursor-pointer"
                              width={40}
                              height={40}
                            />
                          </TwitterButton>
                          <TelegramShareButton url={url}>
                            <Image
                              src={"/telegram.png"}
                              alt="telegram"
                              className=" cursor-pointer"
                              width={40}
                              height={40}
                            />
                          </TelegramShareButton>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </>
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
    return {
      props: {
        error: true,
      },
    };
  }
};

export default PromotionDtail;
