import { useState, useEffect } from "react";

// Retooled hook into util functions
export function windowSizeUtils() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const vw = (n: number) => (windowSize.width / 100) * n;
  const vh = (n: number) => (windowSize.height / 100) * n;
  const vmin = (n: number) => Math.min(vw(n), vh(n));
  const vmax = (n: number) => Math.max(vw(n), vh(n));
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      //prevent virtual keyboard from redrawing everything
      //causes screen rotation to be buggy
      // if (window.innerWidth === windowSize.width) return;
      // console.log("window resized");
      // Set window width/height to state
      setWindowSize({
        // width: window.innerWidth,
        width: window.innerWidth,
        // height: window.innerHeight,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return { vw, vh, vmin, vmax };
}
