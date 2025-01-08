import { create } from "zustand";

export const useChapterStore = create((set, get) => ({
  link: "",
  title: "",
  readChapter: ({ link, title }) => {
    set({
      link,
      title,
    });
  },
  reset: () => {
    set({
      link: "",
      title: "",
    });
  },
}));
