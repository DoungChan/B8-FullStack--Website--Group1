import Link from "next/link";
import { Categories } from "./Categories";

const CategoriesPage = () => {
  return (
    <div>
      {/* Render category links */}
      {Categories.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <a>{`http://localhost:3000/category/${category.name}`}</a>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesPage;
