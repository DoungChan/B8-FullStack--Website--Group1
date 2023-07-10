import { useEffect } from "react";
import PromotionCard from "@/components/popular/PromotionCard";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import { useRecoilState, useRecoilValue } from "recoil";
import { promotionsAtom } from "@/state/recoilAtoms";
import { categoryHomeAtom } from "@/state/recoilAtoms";
import CustomPagination from "@/components/pagination/CustomPagination";
import Head from "next/head";

const CategoryDetail = ({ data, error }) => {
  const router = useRouter();
  const categoryInformation = useRecoilValue(categoryHomeAtom);
  const [promotionsCategory, setPromotionsCategory] =
    useRecoilState(promotionsAtom);

  useEffect(() => {
    if (data) {
      setPromotionsCategory(data.data); // Update the state with data.data
    }
  }, [data]);

  const categoryId = router.query.categoryId;
  const category = categoryInformation.find(
    (category) => category.id === categoryId
  );
  const categoryName = category ? category.name : "";

  return (
    <>
      <Head>
        <title>{categoryName} | PromoKh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {error ? (
        () => router.push("/500")
      ) : (
        <div className="py-24">
          <div className="flex justify-center">
            {/* Rest of the category detail page */}
            <div>
              <h1 className="my-8 text-2xl font-bold text-font_color">
                {categoryName}
              </h1>
              <div>
                <div className="grid grid-cols-4 max-[480px]:grid-cols-1 gap-8">
                  {data.data.map((promotion, index) => (
                    <PromotionCard promotion={promotion} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <CustomPagination
            resPerPage={24}
            promotionsCount={data.totalElements}
          />
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const urlApi = process.env.API_URL;
  const api_token = process.env.API_TOKEN;
  const { categoryId } = context.query;

  try {
    const res = await fetch(
      `${urlApi}/promotion/get?category_id=${categoryId}&page=0&size=24`,
      {
        headers: {
          "api-token": api_token,
        },
      }
    );

    const data = await res.json();

    if (data.status !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
};
export default CategoryDetail;
