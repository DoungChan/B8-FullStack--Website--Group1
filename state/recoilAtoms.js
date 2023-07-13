import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//create atoms for promotion details
export const promotionDetailAtom = atom({
  key: "promotionDetailAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// create atoms for handle modal
export const profileCardAtom = atom({
  key: "profileCardAtom",
  default: false,
});

// create atoms for handle modal
export const ceateCardAtom = atom({
  key: "ceateCardAtom",
  default: false,
});

// search atom
export const searchAtom = atom({
  key: "searchAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const featureAtom = atom({
  key: "featureAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const promotionsAtom = atom({
  key: "promotionsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryHomeAtom = atom({
  key: "categoryHomeAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const loginModalAtom = atom({
  key: "loginModalAtom",
  default: false,
});

export const signUpModalAtom = atom({
  key: "signUpModalAtom",
  default: false,
});

export const savedPromotionsAtom = atom({
  key: "savedPromotionsAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
