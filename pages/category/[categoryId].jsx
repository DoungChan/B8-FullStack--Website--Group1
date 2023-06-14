import { useEffect } from "react";
import { Promotions } from "@/components/popular/Promotions";
import PromotionCard from "@/components/popular/PromotionCard";
import { useRouter } from "next/router";
import { Categories } from "./Categories";
import { TailSpin } from "react-loader-spinner";

const CategoryDetail = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  // Find the category based on the categoryId
  const category = Categories.find((cat) => cat.id === Number(categoryId));

  useEffect(() => {
    if (categoryId && !category) {
      // Redirect to 404 page when category is not found
      router.push("/404");
    }
  }, [categoryId, category, router]);

  if (!category) {
    // Render a loading spinner or message while redirecting to 404 page
    return (
      <div className="flex justify-center items-center p-48">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  // Get the promotions for the selected category
  const categoryPromotions = Promotions.filter(
    (promotion) => promotion.categoryId === category.id
  );

  return (
    <div className="flex justify-center py-24">
      {/* Rest of the category detail page */}
      <div>
        <h1 className="my-8 text-2xl font-bold text-font_color">
          {category.name}
        </h1>
        <div>
          <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
            {categoryPromotions.map((promotion, index) => (
              <PromotionCard promotion={promotion} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
