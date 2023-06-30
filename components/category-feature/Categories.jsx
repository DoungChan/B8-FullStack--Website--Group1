import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, categoryHomeAtom } from "@/state/recoilAtoms";

export default function Categories({ categoryData }) {
  const [category, setCategory] = useRecoilState(categoryHomeAtom);

  useEffect(() => {
    setCategory(categoryData.data);
  }, [categoryData, setCategory]);

  return (
    <div className="mt-10 text-font_color">
      <h2 className="font-bold text-2xl px-2 py-4 pb-6 lg:text-left sm:text-center">
        Search{" "}
        <span className="underline underline-offset-8 decoration-softPurple decoration-8">
          different Category
        </span>
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {categoryData.data &&
          categoryData.data.map((category) => (
            <div className="p-2" key={category.id}>
              <Link href={`/category/${category.id}`}>
                <Image
                  src={category.iconUrl}
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
