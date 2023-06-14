import Image from "next/image";

const promotions = [
  {
    imageSrc: "/features/orange.jpg",
    date: "23 May - 26 May",
    title: "ABC Restaurant Drink",
    location: "Street 704, Phnom Penh",
    originalPrice: "$10",
    discountedPrice: "$5",
    discountPercentage: "50% OFF",
  },
  {
    imageSrc: "/features/drink.jpg",
    date: "23 May - 26 May",
    title: "XYZ Cafe Drink",
    location: "Street 123, Phnom Penh",
    originalPrice: "$8",
    discountedPrice: "$4",
    discountPercentage: "50% OFF",
  },
  {
    imageSrc: "/features/smoothie.jpg",
    date: "23 May - 26 May",
    title: "Smoothie Paradise",
    location: "Street 456, Phnom Penh",
    originalPrice: "$12",
    discountedPrice: "$6",
    discountPercentage: "50% OFF",
  },
];

export default function Feature() {
  return (
    <div className="mt-28 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Hey, check out today&#39;s hottest promotions
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {promotions.map((promotion, index) => (
          <div className="p-2" key={index}>
            <Image
              src={promotion.imageSrc}
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
                <p className="pl-2 text-base text-gray">{promotion.date}</p>
              </div>
              <div className="text-lg font-bold">{promotion.title}</div>
              <div className="text-base">{promotion.location}</div>
              <div className="flex flex-row pt-1 items-center">
                <div className="flex flex-row text-xl">
                  <div className="line-through">{promotion.originalPrice}</div>
                  <div className="font-bold px-1">
                    {promotion.discountedPrice}
                  </div>
                </div>
                <div className="pl-1">
                  <div className="bg-lightBlue text-xs text-blue p-1 rounded font-bold">
                    {promotion.discountPercentage}
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
