import { atom } from "recoil";
//create atoms for category
export const categoryAtom = atom({
  key: "categoryAtom",
  default: [
    {
      id: 1,
      name: "Travel",
    },
    {
      id: 2,
      name: "Food",
    },
    {
      id: 3,
      name: "Tech",
    },
    {
      id: 4,
      name: "Fashion",
    },
    {
      id: 5,
      name: "Grocery",
    },
    {
      id: 6,
      name: "Others",
    },
  ],
});
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
