import { atom } from "recoil";

//create atoms for promotion details
export const promotionDetailAtom = atom({
  key: "promotionDetailAtom",
  default: [],
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
});

export const featureAtom = atom({
  key: "featureAtom",
  default: [],
});

export const promotionsAtom = atom({
  key: "promotionsAtom",
  default: [],
});

export const categoryHomeAtom = atom({
  key: "categoryHomeAtom",
  default: [],
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
});
