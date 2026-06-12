import { useEffect } from "react";

export const useTextHoverSound = (soundUrl) => {
  useEffect(() => {
    console.log("Hook mounted, soundUrl:", soundUrl);

    const audio = new Audio(soundUrl);
    audio.volume = 1.0;

    const handleMouseOver = (event) => {
      console.log("Hovered:", event.target.tagName);
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Audio error:", err);
      });
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, [soundUrl]);
};
