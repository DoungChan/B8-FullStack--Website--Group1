import Image from "next/image";
import category1 from "public/Categories/category1.png";
import category2 from "public/Categories/category2.png";
import category3 from "public/Categories/category3.png";
import category4 from "public/Categories/category4.png";
import category5 from "public/Categories/category5.png";
import category6 from "public/Categories/category6.png";


export default function Categories() {
  return (
    <div className=" mt-10 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Search different categories
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        <div className="p-2">
          <Image
            src={category1}
            alt="category1"
            width={200}
            height={251}
            className="rounded-lg"
          />
        </div>
        <div className="p-2">
          <Image
            src={category2}
            width={200}
            height={251}
            alt="category1"
            className="rounded-lg"
          />
        </div>
        <div className="p-2">
          <Image
            src={category3}
            width={200}
            height={251}
            alt="category1"
            className="rounded-lg"
          />
        </div>
        <div className="p-2">
          <Image
            src={category4}
            width={200}
            height={251}
            alt="category1"
            className="rounded-lg"
          />
        </div>
        <div className="p-2">
          <Image
            src={category5}
            width={200}
            height={251}
            alt="category1"
            className="rounded-lg"
          />
        </div>
        <div className="p-2">
          <Image
            src={category6}
            width={200}
            height={251}
            alt="category1"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

