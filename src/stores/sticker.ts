import { atom } from "nanostores";

export const numStickers = atom(0);
export const topZIndex = atom(1);

export const addSticker = () => {
  topZIndex.set(topZIndex.get() + 1);
  numStickers.set(numStickers.get() + 1);
};

export const incrementTopZIndex = () => {
  topZIndex.set(topZIndex.get() + 1);
};

export const clearStickers = () => {
  topZIndex.set(1);
  numStickers.set(0);
};
