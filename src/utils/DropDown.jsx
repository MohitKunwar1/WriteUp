import React, { useEffect, useRef } from "react";

const DropDown = ({ children, size, showDrop, setShowDrop }) => {
  const dropRef = useRef(null);

  useEffect(() => {
    const clickOutSide = (e) => {
      if (showDrop && dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDrop(false)
      }
    };
    window.addEventListener("mousedown", clickOutSide);
    return () => window.removeEventListener("mousedown", clickOutSide);
  }, [dropRef, showDrop]);

  return (
    <>
      {showDrop && (
        <div
        ref={dropRef}
          className={` shadow flex flex-col absolute right-0 top-[2rem] bg-white ${size}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropDown;
