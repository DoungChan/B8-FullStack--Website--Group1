import Link from "next/link";
import Image from "next/image";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom } from "@/state/recoilAtoms";

export default function Categories() {
  const categories = useRecoilValue(categoryAtom);

  return (
    <div className="mt-10 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 lg:text-left sm:text-center">
        Search different categories
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {categories.map((category) => (
          <div className="p-2" key={category.id}>
            <Link href={`/category/${category.id}`}>
              <Image
                src={category.imageSrc}
                alt={`category${category.id}`}
                width={200}
                height={251}
                className="rounded-lg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
