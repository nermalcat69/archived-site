import { atom } from "nanostores";
import { useEffect, useState } from "react";

export const numStickers = atom(0);
export const topZIndex = atom(1);

// Custom useStore hook compatible with React 19
export const useStore = <T>(store: { subscribe: (callback: (value: T) => void) => () => void; get: () => T }) => {
  const [value, setValue] = useState<T>(store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(setValue);
    return unsubscribe;
  }, [store]);

  return value;
};

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
