"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const List = ({ data, selected, rotation, handleKeyDown, handleClick }: any) => {
  const itemEls = useRef([]);

  useEffect(() => {
    (itemEls.current[selected] as any)?.focus();
  }, [selected]);

  return (
    <div className="container">
      <span className="indicator" />
      <motion.ul
        role="listbox"
        aria-label="Sound knob wheel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="list"
        animate={{ rotate: 10 * rotation }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: 0.1,
        }}
      >
        {data.map((item: string, i: number) => (
          <div
            key={item}
            tabIndex={-1}
            className="list-item"
            style={{
              transform: `translateY(-50%) rotate(${-10 * i}deg)`,
            }}
          >
            <motion.li
              layout
              className="list-item-content"
              onClick={() => handleClick(i)}
              role="option"
              tabIndex={-1}
              aria-selected={i === selected}
              aria-label={"Now playing" + item}
              ref={(el: any) => ((itemEls.current[i] as any) = el)}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.1,
              }}
            >
              {item}
            </motion.li>
          </div>
        ))}
      </motion.ul>
    </div>
  );
};

export default List;
