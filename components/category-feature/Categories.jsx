import Image from "next/image";
import { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, categoryHomeAtom } from "@/state/recoilAtoms";
import Link from "next/link";

export default function Categories({ categoryData, error }) {
  const [category, setCategory] = useRecoilState(categoryHomeAtom);

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData.data);
    }
  }, [categoryData, setCategory, error]);

  return (
    <div>
      {error ? (
        () => router.push("/500")
      ) : (
        <div className="mt-10 text-font_color">
          <h2 className="font-bold text-2xl px-2 py-4 pb-6 text-left">
            Search{" "}
            <span className="underline underline-offset-8 decoration-softPurple decoration-8">
              different Category
            </span>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 justify-center items-center">
            {categoryData.data &&
              categoryData.data.map((category) => (
                <div className="p-2" key={category.id}>
                  <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-lg">
                    <Link href={`/category/${category.id}`}>
                      <Image
                        src={category.iconUrl}
                        alt={`category${category.id}`}
                        width={200}
                        height={251}
                        className="transition duration-500 ease-in-out hover:scale-110"
                      />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
