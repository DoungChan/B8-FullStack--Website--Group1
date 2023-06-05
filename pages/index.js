import PopularPromotions from "@/components/popular/PopularPromotions";
import Navbar from "../components/navbar/Navbar";
import UnauthorizeComponent from "@/components/unauthorized/UnauthorizeComponent";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between `}
    >
      <PopularPromotions />
    </main>
  );
}
