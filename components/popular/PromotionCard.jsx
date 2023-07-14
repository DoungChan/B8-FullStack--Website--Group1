import { useState } from "react";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { convertTimestamp } from "@/utils/convertTimestamp";
import Link from "next/link";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { refetchPostPromotionsAtom } from "@/state/refetchDataAtoms.js";
import callApi from "@/services/apiCalling";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  borderColor: "red",
};

const PromotionCard = ({ promotion, postPromo = false }) => {
  const [_, setRefetchPostPromotions] = useRecoilState(
    refetchPostPromotionsAtom
  );
  const [isDeletePostedPromotionLoading, setIsDeletePostedPromotionLoading] =
    useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  const [scaleImage, setScaleImage] = useState(false);
  // Replace feature_image_url if it is null or empty
  const imageUrl =
    promotion.feature_image_url ||
    "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png";
  const handleScaleImage = () => {
    setScaleImage(!scaleImage);
  };

  // Convert timestamp to date
  let endDate = new Date(promotion.end_date);
  endDate.setHours(endDate.getHours() + 24);
  const today = new Date();

  const hasExpired = endDate < today;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setMouseHover(false);
  }

  const onDeletePromotion = () => {
    setIsDeletePostedPromotionLoading(true);
    callApi(`/posted_promotion/delete?promotionId=${promotion.id}`, "DELETE")
      .then((res) => {
        if (res.status === 200) {
          closeModal();
          setRefetchPostPromotions(true);
        }
        setIsDeletePostedPromotionLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div
      onMouseOver={() => setMouseHover(true)}
      onMouseOut={() => setMouseHover(false)}
    >
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="flex justify-center items-center">
            <Image
              src="/icon_images/trash_icon.png"
              width={150}
              height={150}
              alt="Trash"
            />
          </div>
          <div className="flex items-center justify-center">
            <h4 className="font-bold text-font_color">
              Are you sure you want to <br />
              delete your promotion?
            </h4>
          </div>
          <div className="flex justify-center items-center my-4">
            {isDeletePostedPromotionLoading ? (
              <div className="flex justify-center items-center">
                <ClipLoader loading={true} cssOverride={override} size={40} />{" "}
                <p className=" text-red-600 ml-2">Deleting ...</p>
              </div>
            ) : (
              <div>
                <button
                  className="border px-10 py-2 rounded mr-4 text-black"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="border px-10 py-2 rounded bg-redDanger text-white"
                  onClick={onDeletePromotion}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </Modal>
      </div>
      <Link href={`/promotion/${promotion.id}`}>
        <div
          className="w-[302px] h-[298px] duration-700 rounded-lg items-center justify-center overflow-hidden"
          onMouseEnter={handleScaleImage}
          onMouseLeave={handleScaleImage}
        >
          {hasExpired ? (
            <div className="relative w-full h-[184px] rounded-lg overflow-hidden">
              <img
                src={"expired.png"}
                className={`${
                  scaleImage ? "scale-105 duration-500" : " duration-500"
                } w-full h-full object-cover rounded-lg`}
              />
              {postPromo && mouseHover && (
                <div
                  className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex justify-center items-center"
                  onClick={(event) => {
                    event.preventDefault();
                    openModal();
                  }}
                >
                  <RiDeleteBin6Line color="white" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-[184px] rounded-lg overflow-hidden">
              <img
                src={
                  promotion.feature_image_url
                    ? promotion.feature_image_url
                    : "https://bronzebaxxtanning.com/wp-content/uploads/promo-placeholder.jpg"
                }
                alt={promotion.title}
                className={`${
                  scaleImage ? "scale-105 duration-500" : " duration-500"
                } w-full h-full object-cover rounded-lg`}
              />
              {postPromo && mouseHover && (
                <div
                  className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex justify-center items-center"
                  onClick={(event) => {
                    event.preventDefault();
                    openModal();
                  }}
                >
                  <RiDeleteBin6Line color="white" />
                </div>
              )}
            </div>
          )}
          {/* <img
              src={
                promotion.feature_image_url &&
                  promotion.feature_image_url.length > 0
                  ? promotion.feature_image_url
                  : "https://bronzebaxxtanning.com/wp-content/uploads/promo-placeholder.jpg"
              }
              alt={promotion.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {(postPromo && mouseHover)  && (<div className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex justify-center items-center" onClick={(event => {
              event.preventDefault();
              openModal();
            })}>
              <RiDeleteBin6Line color="white" />
            </div>)} */}

          <div className="py-2 px-2">
            <div className="flex items-center text-font_color">
              <BsClock />
              <p className="ml-2 text-font_color">
                {convertTimestamp(promotion.start_date)} -{" "}
                {convertTimestamp(promotion.end_date)}
              </p>
            </div>
            <p className="font-bold text-font_color">{promotion.title}</p>
            <p className="text-font_color">{promotion.location}</p>
            <div className="flex items-center">
              <p className="mr-2 line-through text-font_color">
                ${promotion.old_price}
              </p>
              <p className="mr-2 font-bold text-font_color">
                ${promotion.discount_price}
              </p>
              <p className="bg-lightBlue rounded-[4px] p-1 text-xs text-blue font-bold">
                {promotion.discount_percentage}% OFF
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PromotionCard;
