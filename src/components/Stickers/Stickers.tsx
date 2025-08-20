import classNames from "classnames";
import { AnimatePresence } from "motion/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { clearStickers, numStickers, useStore } from "../../stores/sticker";
import { STICKER_VARIANTS, Sticker, type StickerProps } from "./Sticker";

export const Stickers = () => {
  const [stickers, setStickers] = useState<StickerProps[]>([]);
  const [showShoo, setShowShoo] = useState(false);
  const [exiting, setExiting] = useState(false);
  const $numStickers = useStore(numStickers);

  useEffect(() => {
    // Preload first sticker
    new Image().src = STICKER_VARIANTS[0].srcSet;
  }, []);

  useEffect(() => {
    if ($numStickers === 0) {
      setStickers([]);
      setShowShoo(false);
      return;
    }

    setShowShoo($numStickers > 2);

    if ($numStickers > stickers.length) {
      setStickers((prev) => [
        ...prev,
        {
          id: nanoid(),
          variant: $numStickers,
        },
      ]);
    }
  }, [$numStickers, stickers.length]);

  const handleShoo = () => {
    setExiting(true);
    clearStickers();
    setTimeout(() => {
      setExiting(false);
    }, 300);
  };

  return (
    <div className="stickers" style={{ viewTransitionName: "stickers" }}>
      <AnimatePresence>
        {stickers.map(({ id, variant }) => (
          <Sticker key={id} id={id} variant={variant} />
        ))}
        {showShoo && (
          <div className="shoo-wrapper">
            <button
              data-sam-shoo
              onClick={handleShoo}
              className={classNames({
                exiting,
              })}
              type="button"
            >
              Shoo Sam
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
