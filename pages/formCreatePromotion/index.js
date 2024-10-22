import clientApiClient from "@/utils/clientApiClient";
import { useState } from "react";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast.success("Your promotion has been created  🎉", {
    style: {
      border: "1px solid #fff",
      padding: "16px",
      color: "#fff",
      backgroundColor: "#6F47EB",
    },
    iconTheme: {
      primary: "#FFFAEE",
      secondary: "#6F47EB",
    },
  });
const errorToast = () => {
  toast.error("Please fill out every field  ⚠️", {
    style: {
      border: "1px solid #fff",
      padding: "16px",
      color: "#fff",
      backgroundColor: "#FFA235",
    },
    iconTheme: {
      primary: "#FFFAEE",
      secondary: "#FFA235",
    },
  });
};
const PromotionForm = () => {
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [showCategory, setShowCategory] = useState(false);
  const get_categories = async () => {
    const url = "api/promotion/category";
    try {
      const accessToken = localStorage.getItem("accessToken");
      clientApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      const response = await clientApiClient.get(url);
      setCategories(response.data.data);
      setShowCategory((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [filesFeature, setFileFeature] = useState([]);
  const [message, setMessage] = useState();
  const [filesPromotion, setPromotionFile] = useState([]);
  const [promotionMessage, setPromotionMessage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState([]);

  const changeCategory = ({ item }) => {
    setCategory(item.name);
    setShowCategory(false);
    setCategoryId(item.id);
  };

  const handleFeatureFile = async (e) => {
    const url = "api/generate-upload-url";
    setMessage("");
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    let file = e.target.files;
    try {
      const accessToken = localStorage.getItem("accessToken");
      clientApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      const response = await clientApiClient.get(url);
      await fetch(response.data.data, {
        method: "PUT",
        body: file[0],
      });
      setImageUrl(response.data.data.split("?")[0]);
    } catch (error) {
      console.log(error);
    }
    if (validImageTypes.includes(file[0]["type"])) {
      setFileFeature([file[0]]);
    }
  };
  const handlePromotionFile = async (e) => {
    const url = "api/generate-upload-url";
    setPromotionMessage("");
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      if (validImageTypes.includes(fileType)) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          clientApiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          const response = await clientApiClient.get(url);
          await fetch(response.data.data, {
            method: "PUT",
            body: file[i],
          });
          setImageList((prev) => [...prev, response.data.data.split("?")[0]]);
        } catch (error) {
          console.log(error);
        }
        setPromotionFile([...filesPromotion, file[i]]);
      } else {
        setMessage("Only images accepted");
      }
    }
  };

  const handleSubmitForm = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const old_price = form.old_price.value;
    const discount_percentage = form.discount_percentage.value;
    const discount_price = form.discount_price.value;
    const start_date = form.start_date.value;
    const end_date = form.end_date.value;
    const location = form.location.value;
    const promotion_detail = form.promotion_detail.value;
    const contact_number = form.contact_number.value;
    const facebook_name = form.facebook_name.value;
    const promotion_url = form.promotion_url.value;

    const url = "api/promotion/add";

    const body = {
      title,
      category_id: categoryId.toString(),
      old_price,
      discount_price,
      discount_percentage,
      feature_image_url: imageUrl,
      image_url_list: imageList,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      facebook_name,
      location,
      promotion_detail,
      contact_number,
      promotion_url,
    };

    if (
      body.category_id &&
      body.feature_image_url &&
      body.image_url_list.length > 0
    ) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        clientApiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        const response = await clientApiClient.post(url, { body });

        if (response.data.message === "success") {
          setSuccess(true);

          notify();
          setTimeout(() => {
            window.location.href = "/";
          }, 300);
        } else {
          setSuccess(false);

          errorToast();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuccess(false);
      errorToast();
    }
  };

  const removeImage = (i) => {
    setFileFeature(filesFeature.filter((x) => x.name !== i));
  };

  const removePromotionImage = (i) => {
    setPromotionFile(filesPromotion.filter((x) => x.name !== i));
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Create Promotion | PromoKh</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="flex h-max  w-full max-w-6xl p-10 flex-col m-auto">
        <form
          className="flex justify-between max-w-[80%] min-w-[90%] w-full self-center h-full flex-col max-sm:-mt-9"
          onSubmit={handleSubmitForm}
        >
          <div className=" text-font_color text-2xl font-bold  self-start pt-16 pb-4 w-full max-sm:mt-12 max-sm:text-xl">
            🎉 Post a new Promotion
          </div>
          {/* first row */}
          <div className="flex max-sm:block">
            <input
              required
              className="placeholder-gray-500 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3"
              type="text"
              id="title"
              placeholder="Promotion title or Shop name"
            />
            <div className="w-5" />
            <input
              required
              className="placeholder-gray-500 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3"
              type="text"
              id="location"
              placeholder="Shop Location"
            />
          </div>
          {/* second row */}
          <div className=" flex max-sm:block">
            <div className=" flex content-start  flex-row justify-between items-start border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3 ">
              <label className=" text-gray-500 ">Start Date</label>
              <input
                className="   min-w-[44%] max-w-[30%] min-h-[100%] bg-gray-200 rounded-md px-2 "
                required
                type="date"
                id="start_date"
                onBlur={(e) => (e.target.placeholder = "dd/mm/yyy")}
              />
            </div>
            {/* <div
              class="relative mb-3 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3"
              id="datepicker-close-without-confirmation"
              data-te-input-wrapper-init
            >
              <input
                id="start_date"
                type="date"
                class="flex justify-end peer  min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Select a date"
              />
              <label
                for="floatingInput"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:hidden peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:hidden"
              >
                Promotion Start Date
              </label>
            </div> */}
            <div className="w-5" />

            <div className=" flex content-start  flex-row justify-between items-start border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3 ">
              <label className=" text-gray-500">End Date</label>
              <input
                className="   min-w-[44%] max-w-[30%] min-h-[100%] bg-gray-200 rounded-md px-2 "
                required
                type="date"
                id="end_date"
              />
            </div>
          </div>
          {/* third row */}
          <div className=" flex flex-row max-w-full max-lg:block">
            <div className="flex flex-col w-full max-sm:w-full mt-3">
              <div className=" flex border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 ">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 19L19 5"
                    stroke="#1E1926"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z"
                    stroke="#1E1926"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z"
                    stroke="#1E1926"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  className="placeholder-gray-500 appearance-none border-none outline-none ml-2 text-font_color text-sm grow"
                  type="number"
                  step="0.01"
                  id="discount_percentage"
                  placeholder="Discount Offer"
                />
              </div>

              <label class="text-gray-400 text-xs">
                Optional, you may leave it blank
              </label>
            </div>

            <div className="w-5 " />
            <div className="flex flex-col w-full max-sm:w-full mt-3">
              <div className="flex border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4  ">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.998 8.5H17.998C17.998 5.663 15.243 4.369 12.998 4.071V2H10.998V4.071C8.75305 4.369 5.99805 5.663 5.99805 8.5C5.99805 11.206 8.66405 12.613 10.998 12.93V17.9C9.55005 17.649 7.99805 16.876 7.99805 15.5H5.99805C5.99805 18.089 8.42305 19.619 10.998 19.936V22H12.998V19.93C15.243 19.632 17.998 18.337 17.998 15.5C17.998 12.663 15.243 11.369 12.998 11.071V6.1C14.328 6.339 15.998 7.041 15.998 8.5ZM7.99805 8.5C7.99805 7.041 9.66805 6.339 10.998 6.1V10.899C9.62705 10.646 7.99805 9.897 7.99805 8.5ZM15.998 15.5C15.998 16.959 14.328 17.661 12.998 17.9V13.1C14.328 13.339 15.998 14.041 15.998 15.5Z"
                    fill="#1E1926"
                  />
                </svg>

                <input
                  className="placeholder-gray-500 appearance-none border-none outline-none	ml-2 text-font_color text-sm grow  "
                  type="number"
                  id="old_price"
                  step="0.01"
                  placeholder="Full Price"
                />
              </div>
              <label className="text-gray-400 text-xs">
                Optional, you may leave it blank
              </label>
            </div>
            <div className="w-5 " />
            <div className="flex flex-col w-full max-sm:w-full mt-3">
              <div className="flex border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4  ">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.998 8.5H17.998C17.998 5.663 15.243 4.369 12.998 4.071V2H10.998V4.071C8.75305 4.369 5.99805 5.663 5.99805 8.5C5.99805 11.206 8.66405 12.613 10.998 12.93V17.9C9.55005 17.649 7.99805 16.876 7.99805 15.5H5.99805C5.99805 18.089 8.42305 19.619 10.998 19.936V22H12.998V19.93C15.243 19.632 17.998 18.337 17.998 15.5C17.998 12.663 15.243 11.369 12.998 11.071V6.1C14.328 6.339 15.998 7.041 15.998 8.5ZM7.99805 8.5C7.99805 7.041 9.66805 6.339 10.998 6.1V10.899C9.62705 10.646 7.99805 9.897 7.99805 8.5ZM15.998 15.5C15.998 16.959 14.328 17.661 12.998 17.9V13.1C14.328 13.339 15.998 14.041 15.998 15.5Z"
                    fill="#1E1926"
                  />
                </svg>
                <input
                  className="placeholder-gray-500 appearance-none border-none outline-none ml-2 text-font_color text-sm grow"
                  type="number"
                  step="0.01"
                  id="discount_price"
                  placeholder="Price after Discount"
                />
              </div>
              <label className="text-gray-400 text-xs">
                Optional, you may leave it blank
              </label>
            </div>
          </div>

          {/* row */}
          <div className="w-full relative cursor-pointer " required>
            <div
              type="button"
              required
              onClick={() => get_categories()}
              className={
                showCategory
                  ? " flex border-b-0 mt-3 h-10 content-start border  flex-row justify-between items-start border-gray-400 rounded-b-none  shadow-inner rounded-md p-2 px-4 w-full"
                  : " flex mt-3 h-10 content-start border  flex-row justify-between border-gray-400  shadow-inner rounded-md p-2 px-4 w-full"
              }
            >
              <p
                className={
                  category === ""
                    ? "  dark:text-gray-400 text-sm"
                    : "  dark:text-gray-500 text-sm"
                }
              >
                {category === "" ? "Category" : category}
              </p>
              <div className=" self-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 124 124"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_346_1307)">
                    <path
                      d="M117.979 28.0171H5.97922C0.679216 28.0171 -2.02078 34.4171 1.77922 38.2171L57.7792 94.2171C60.0792 96.5171 63.8792 96.5171 66.1802 94.2171L122.18 38.2171C125.979 34.4171 123.279 28.0171 117.979 28.0171Z"
                      fill="grey"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_346_1307">
                      <rect width="123.959" height="123.958" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {showCategory ? (
              <div className=" absolute w-full shadow-xl bg-white rounded-b-lg py-2 placeholder-gray-500 border-gray-400 border border-t-0">
                {categories.map((item) => (
                  <div
                    required
                    onClick={() => changeCategory({ item })}
                    key={item.name}
                    className=" dark:text-gray-500 text-sm pb-2 px-5 py-2 hover:bg-lightGray "
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* fourth row */}
          <div className=" flex pt-3 items-start max-sm:block ">
            <div class="flex flex-col items-center justify-center w-3/6 max-sm:w-full mt-3">
              <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <label
                for="dropzone-file-feature"
                class="flex flex-col items-center justify-center w-full h-64  border-gray-400 border  rounded-lg cursor-pointer dark:hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class=" text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold text-gray-500">Click</span> to
                    upload
                    <span class="font-semibold text-gray-500"> Featured</span>
                  </p>
                  <p class="text-sm font-semibold  dark:text-gray-500">Photo</p>
                </div>
                <input
                  id="dropzone-file-feature"
                  onChange={handleFeatureFile}
                  type="file"
                  class="hidden"
                />
              </label>
              <label className="flex self-start text-gray-400 text-xs ">
                Upload one image for the featured photo
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {filesFeature.map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="mdi pt-2 mdi-close absolute right-1 hover:text-white cursor-pointer"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 492 492"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_9517_117)">
                            <path
                              d="M300.188 246L484.14 62.0396C489.2 56.9756 491.992 50.2196 492 43.0156C492 35.8076 489.208 29.0436 484.14 23.9876L468.02 7.87163C462.952 2.79563 456.196 0.015625 448.984 0.015625C441.784 0.015625 435.028 2.79563 429.96 7.87163L246.008 191.82L62.048 7.87163C56.988 2.79563 50.228 0.015625 43.02 0.015625C35.82 0.015625 29.06 2.79563 24 7.87163L7.872 23.9876C-2.624 34.4836 -2.624 51.5556 7.872 62.0396L191.828 246L7.872 429.952C2.808 435.024 0.02 441.78 0.02 448.984C0.02 456.188 2.808 462.944 7.872 468.012L23.996 484.128C29.056 489.2 35.82 491.984 43.016 491.984C50.224 491.984 56.984 489.2 62.044 484.128L246.004 300.176L429.956 484.128C435.024 489.2 441.78 491.984 448.98 491.984H448.988C456.192 491.984 462.948 489.2 468.016 484.128L484.136 468.012C489.196 462.948 491.988 456.188 491.988 448.984C491.988 441.78 489.196 435.024 484.136 429.956L300.188 246Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9517_117">
                              <rect width="492" height="492" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </i>
                      <img
                        className="h-20 w-20 rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-5" />

            <div class="flex flex-col items-center justify-center w-3/6  max-sm:w-full mt-3">
              <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <label
                for="dropzone-file-promotion"
                class="flex flex-col items-center justify-center w-full h-64  border-gray-400 border  rounded-lg cursor-pointer dark:hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class=" text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold text-gray-500">Click</span> to
                    upload
                    <span class="font-semibold text-gray-500"> Promotion</span>
                  </p>
                  <p class="text-sm font-semibold  dark:text-gray-500">
                    Photos
                  </p>
                </div>
                <input
                  id="dropzone-file-promotion"
                  onChange={handlePromotionFile}
                  type="file"
                  class="hidden"
                />
              </label>
              <label className="flex self-start text-gray-400 text-xs ">
                You can upload multiple images for your promotion
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {filesPromotion.map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removePromotionImage(file.name);
                        }}
                        className="mdi pt-2 mdi-close absolute right-1 hover:text-white cursor-pointer"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 492 492"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_9517_117)">
                            <path
                              d="M300.188 246L484.14 62.0396C489.2 56.9756 491.992 50.2196 492 43.0156C492 35.8076 489.208 29.0436 484.14 23.9876L468.02 7.87163C462.952 2.79563 456.196 0.015625 448.984 0.015625C441.784 0.015625 435.028 2.79563 429.96 7.87163L246.008 191.82L62.048 7.87163C56.988 2.79563 50.228 0.015625 43.02 0.015625C35.82 0.015625 29.06 2.79563 24 7.87163L7.872 23.9876C-2.624 34.4836 -2.624 51.5556 7.872 62.0396L191.828 246L7.872 429.952C2.808 435.024 0.02 441.78 0.02 448.984C0.02 456.188 2.808 462.944 7.872 468.012L23.996 484.128C29.056 489.2 35.82 491.984 43.016 491.984C50.224 491.984 56.984 489.2 62.044 484.128L246.004 300.176L429.956 484.128C435.024 489.2 441.78 491.984 448.98 491.984H448.988C456.192 491.984 462.948 489.2 468.016 484.128L484.136 468.012C489.196 462.948 491.988 456.188 491.988 448.984C491.988 441.78 489.196 435.024 484.136 429.956L300.188 246Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9517_117">
                              <rect width="492" height="492" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </i>
                      <img
                        className="h-20 w-20 rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* fifth row */}
          <textarea
            className="placeholder-gray-500 mt-3 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4  w-full h-20  "
            type="text"
            placeholder="Detail"
            id="promotion_detail"
            rows="4"
            cols="50"
          ></textarea>
          {/* sixth row */}
          <input
            className="placeholder-gray-500 mt-3 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-full  "
            type="text"
            id="promotion_url"
            placeholder="Referral Link or deep link"
          />
          {/* seventh row */}
          <div className="flex max-sm:block">
            <input
              className="placeholder-gray-500  border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3"
              type="text"
              placeholder="Contact Number"
              id="contact_number"
            />
            <div className="w-5" />
            <input
              className="placeholder-gray-500 border border-gray-400 text-font_color text-sm  shadow-inner rounded-md p-2 px-4 w-3/6 max-sm:w-full mt-3 "
              type="text"
              id="facebook_name"
              placeholder="Facebook Page"
            />
          </div>
          <div className="flex h-50 pt-5 ">
            <button
              className="h-full bg-primary hover:bg-blue-700 mt-3 py-2 px-5 rounded-lg font-medium  "
              onClick={() => {}}
            >
              Post
            </button>
            <Toaster toastOptions={{ duration: 3000 }} />
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default PromotionForm;
