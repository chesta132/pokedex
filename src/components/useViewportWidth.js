import { useState, useEffect, useRef } from "react";

function useViewportWidth(delay = 500) {
  const [width, setWidth] = useState(window.innerWidth);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // Clear previous timeout
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timeout
      timerRef.current = setTimeout(() => {
        setWidth(window.innerWidth);
      }, delay);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  return width;
}

export default useViewportWidth;
