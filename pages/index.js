import PopularPromotions from "@/components/popular/PopularPromotions";
import Navbar from "../components/navbar/Navbar";
import UnauthorizeComponent from "@/components/unauthorized/UnauthorizeComponent";
import Category from "../components/category-feature/Categories"
import HotPromotion from "../components/category-feature/Feature"
import Feature from "../components/category-feature/Feature";

export default function Home() {
  return (

    <main className={`flex min-h-screen flex-col items-center justify-between `}>
      <Feature />
      <Category />

   
      <PopularPromotions />

    </main>
  );
}
