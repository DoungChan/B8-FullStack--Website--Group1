import Link from "next/link";
import Image from "next/image";


const categories = [
  { id: 1, imageSrc: "/Categories/category1.png" },
  { id: 2, imageSrc: "/Categories/category2.png" },
  { id: 3, imageSrc: "/Categories/category3.png" },
  { id: 4, imageSrc: "/Categories/category4.png" },
  { id: 5, imageSrc: "/Categories/grocery.png" },
  { id: 6, imageSrc: "/Categories/others.png" },
];


export default function Categories() {
  return (
    <div className="mt-10 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Search different categories
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {categories.map((category) => (
          <div className="p-2" key={category.id}>
            <Image
              src={category.imageSrc}
              alt={`category${category.id}`}
              width={200}
              height={251}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
