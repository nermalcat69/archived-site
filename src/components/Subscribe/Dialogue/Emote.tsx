import { useState } from "react";
import type { ReactNode } from "react";

export type EmoteType =
  | "drooling"
  | "flushed"
  | "happy"
  | "mischief"
  | "neutral"
  | "playful"
  | "sob"
  | "starstruck"
  | "thinking";
  
export const emoteData: Record<EmoteType, string> = {
  drooling: "gradiants/gradiant2.png",
  flushed: "gradiants/gradiant3.png",
  happy: "gradiants/gradiant4.png",
  mischief: "gradiants/gradiant5.png",
  neutral: "gradiants/gradiant6.png",
  playful: "gradiants/gradiant7.png",
  sob: "gradiants/gradiant8.png",
  starstruck: "gradiants/gradiant9.png",
  thinking: "gradiants/gradiant1.png",
};

const emoteList = Object.keys(emoteData) as EmoteType[];

type EmoteProps = {
  initialEmote?: EmoteType;
};

export const Emote = ({ initialEmote = "thinking" }: EmoteProps) => {
  const [index, setIndex] = useState(emoteList.indexOf(initialEmote));

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % emoteList.length);
  };

  const currentEmote = emoteList[index];
  const src = emoteData[currentEmote];

  return (
    <button
      type="button"
      className="stamp"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`${currentEmote} emote`}
    >
      <img src={src} alt={`${currentEmote} gradient`} className="rounded-badge" />
    </button>
  );
};

