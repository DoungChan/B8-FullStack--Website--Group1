import { atom } from "recoil";

export const refetchPostPromotionsAtom = atom({
    key: "refetchPostPromotionAtom",
    default: false,
});