import React, { useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const PromotionDtail = () => {
  const [isHoveredSavePromotiom, setIsHoveredSavePromotiom] = useState(false);
  const [isHoveredGetPromotion, setIsHoveredGetPromotion] = useState(false);

  const handleHoverSavePromotion = () => {
    setIsHoveredSavePromotiom(!isHoveredSavePromotiom);
  };
  const handleHoverGetPromotion = () => {
    setIsHoveredGetPromotion(!isHoveredGetPromotion);
  };
  const slides = [
    {
      src: "https://picsum.photos/seed/img1/600/400",
      alt: "Image 1 for carousel",
    },
    {
      src: "https://picsum.photos/seed/img2/600/400",
      alt: "Image 2 for carousel",
    },
    {
      src: "https://picsum.photos/seed/img3/600/400",
      alt: "Image 3 for carousel",
    },
  ];
  return (
    <div className="mx-10">
      <section className="">
        <div className="flex flex-col md:flex-col lg:flex-row w-full md:gap-[50px] gap-0">
          <div className="w-full md:w-3/1 lg:w-3/1">
            <h1 className="text-2xl font-bold text-start text-font_color mt-28 lg:md-20">
              ABC Restaurant’s spaghetti
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
                Street 704, Phnom Penh
              </p>
            </button>
            <div className="flex flex-row mt-5 w-full rounded-[15px] overflow-hidden">
              <Carousel infiniteLoop stopOnHover={true} showThumbs={false}>
                {slides.map((slide, key) => (
                  <img
                    src={slide.src}
                    alt="Image 1"
                    key={key}
                    className="object-cover w-full h-[425px] rounded-[15px]"
                  />
                ))}
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
                23 May - 26 May
              </p>
            </div>
            <div className="py-[20px]">
              <h1 className="text-font_color font-sans pb-3">Detail</h1>
              <p class="text-sub_font_color font-sans font-thin text-sm">
                When you&apos;re hungry for pizza, say, &ldquo;Life is short.
                Eat better pizza. Let&apos;s get Jet&apos;s.&rdquo; Enjoy $20
                worth of take-out at Jet&apos;s Pizza with this Deal and dig
                into pizzas, breads, boats, and more for take-out, yours for
                $10.
              </p>
            </div>
            <div className="">
              <h1 className="text-font_color font-sans pb-3">Contact</h1>
              <p className="text-sub_font_color font-sans font-thin text-sm">
                Tel: 012 345 678
              </p>
              <p className="text-sub_font_color font-sans font-thin text-sm">
                FackBook : ot ey dak
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
                  src={isHoveredSavePromotiom ? "/whitelove.svg" : "/love.svg"}
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
        <h1 className="text-2xl font-bold text-start text-font_color">
          About ABC Restaurant
        </h1>
        <div className="w-full rounded-[15px] mt-[20px]">
          <img
            src={"/Rectangle.png"}
            className="w-full h-[425px] rounded-md object-cover"
            alt={"image"}
          />
        </div>
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
            <Image src={"/twitter.svg"} alt=" Twitter" width={40} height={40} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default PromotionDtail;
