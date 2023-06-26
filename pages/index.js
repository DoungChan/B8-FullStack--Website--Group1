import PopularPromotions from "@/components/popular/PopularPromotions";
import Navbar from "../components/navbar/Navbar";
import UnauthorizeComponent from "@/components/unauthorized/UnauthorizeComponent";
import PromotionForm from "../pages/formCreatePromotion";
import Category from "../components/category-feature/Categories";
import HotPromotion from "../components/category-feature/Feature";
import Feature from "../components/category-feature/Feature";

export default function Home({ promotionsData }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <Feature promotionsData={promotionsData} />
      <Category />

      <PopularPromotions />
    </main>
  );
}
export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const { category_id } = context.query;

  try {
    const res = await fetch(`${urlApi}/promotion/get?category_Id=`, {
      headers: {
        "api-token": `${api_token}`,
      },
    });
    console.log(res.status);
    const promotionsData = await res.json();
    console.log(promotionsData);
    return {
      props: {
        promotionsData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: true,
      },
    };
  }
};
