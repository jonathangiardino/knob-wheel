"use client";

import List from "@/app/components/List";
import { useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import useSound from "use-sound";

export default function Home() {
  const data = [
    "Accelerate",
    "Blue Dolphin",
    "Convolution",
    "Dynamo",
    "Encyclopedia",
    "Fractal",
    "Great Wall",
    "Hologram",
    "Invisible Hand",
    "Juxtaposition",
    "Kaleidoscope",
    "Leprechaun",
    "Metropolis",
    "Narrative",
    "Oxidize",
    "Purple Rain",
    "Quintessence",
    "Rhetoric",
    "Silhouetted Sky",
    "Traverse",
    "Under Canvas",
    "Vexing",
    "Wanderlust",
    "Xenophobia",
    "Yellow Submarine",
    "Zeppelin",
    "Archipelago",
    "Bellwether",
    "Cerulean Wave",
    "Doodle",
    "Enigma",
    "Fluctuate",
    "Galactic Centre",
    "Holographic",
    "Intricate",
    "Jovial",
  ];

  const [selected, setSelected] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [play] = useSound("/wheel.mp3", {
    volume: 0.25,
  });

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        play();
        setRotation((prev: number) => prev + 1);
        setSelected((oldSelected: number) => {
          oldSelected + 1 < data.length ? oldSelected + 1 : 0;
          return oldSelected + 1 < data.length ? oldSelected + 1 : 0;
        });
        break;

      case "ArrowUp":
        play();
        setRotation((prev: number) => prev - 1);
        setSelected((oldSelected: number) => {
          oldSelected - 1 >= 0 ? oldSelected - 1 : data.length - 1;
          return oldSelected - 1 >= 0 ? oldSelected - 1 : data.length - 1;
        });
        break;

      default:
        return;
    }
  };

  const handleClick = (index: number) => {
    play();
    setSelected(index);

    const clockwiseDistance = (index - selected + data.length) % data.length;

    const counterClockwiseDistance = -(
      (selected - index + data.length) %
      data.length
    );

    let newRotation;

    if (Math.abs(clockwiseDistance) <= Math.abs(counterClockwiseDistance)) {
      newRotation = rotation + clockwiseDistance;
    } else {
      newRotation = rotation + counterClockwiseDistance;
    }
    setRotation(newRotation);
  };

  const listProps = {
    data,
    selected,
    rotation,
    handleKeyDown,
    handleClick,
  };

  return (
    <main>
      <List {...listProps} />
      <div className="fixed bottom-8 right-8 flex items-center gap-2">
        <motion.button
          className="bg-[orangered] rounded-full p-2 w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => handleClick(selected - 1)}
          whileTap={{
            scale: 0.9,
            opacity: 0.9,
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.1,
          }}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 7L7 1L1 7"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.button>
        <motion.button
          className="bg-[orangered] rounded-full p-2 w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => handleClick(selected + 1)}
          whileTap={{
            scale: 0.9,
            opacity: 0.9,
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.1,
          }}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </main>
  );
}
