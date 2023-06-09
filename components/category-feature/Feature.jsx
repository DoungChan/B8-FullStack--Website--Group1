import Image from "next/image";
import smoothie from "public/features/smoothie.jpg";
import drink from "public/features/drink.jpg";
import orange from "public/features/orange.jpg";
import timeIcon from "public/icon/time.svg";

export default function Feature() {
  return (
    <div className="mt-28 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Hey, check out today&#39;s hottest promotions
      </h2>

      <div className="flex flex-row flex-wrap justify-center items-center">
        <div className="p-2">
          <Image
            src={orange}
            width={418}
            height={232}
            alt="image"
            className="rounded-md"
          />
          <div className="flex flex-col flex-wrap pt-3">
            <div className="flex flex-row">
              <Image src={timeIcon} width={23} height={23} alt="timeIcon" />
              <p className="pl-2 text-base text-gray">23 May - 26 May</p>
            </div>
            <div className="text-lg font-bold">ABC Restaurant Drink</div>
            <div className="text-base">Street 704, Phnom Penh</div>
            <div className="flex flex-row pt-1">
              <div className="flex flex-row text-xl">
                <div className="line-through">$10</div>
                <div className="font-bold px-1">$5</div>
              </div>
              <div className="pl-1">
                <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <Image
            src={drink}
            width={418}
            height={232}
            alt="image"
            className="rounded-md"
          />
          <div className="flex flex-col flex-wrap pt-3">
            <div className="flex flex-row">
              <Image src={timeIcon} width={23} height={23} alt="timeIcon" />
              <p className="pl-2 text-base text-gray">23 May - 26 May</p>
            </div>
            <div className="text-lg font-bold">ABC Restaurant Drink</div>
            <div className="text-base">Street 704, Phnom Penh</div>
            <div className="flex flex-row pt-1">
              <div className="flex flex-row text-xl">
                <div className="line-through">$10</div>
                <div className="font-bold px-1">$5</div>
              </div>
              <div className="pl-1">
                <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <Image
            src={smoothie}
            width={418}
            height={232}
            alt="image"
            className="rounded-md"
          />
          <div className="flex flex-col flex-wrap pt-3">
            <div className="flex flex-row">
              <Image src={timeIcon} width={23} height={23} alt="timeIcon" />
              <p className="pl-2 text-base text-gray">23 May - 26 May</p>
            </div>
            <div className="text-lg font-bold">ABC Restaurant Drink</div>
            <div className="text-base">Street 704, Phnom Penh</div>
            <div className="flex flex-row pt-1">
              <div className="flex flex-row text-xl">
                <div className="line-through">$10</div>
                <div className="font-bold px-1">$5</div>
              </div>
              <div className="pl-1">
                <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}