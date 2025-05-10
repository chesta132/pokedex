import "./SearchBar.css";
import { useEffect, useRef } from "react";

export default function SearchBar({ className, handleSubmit, handleReset }) {
  const searchInputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/") {
        if (searchInputRef.current && document.activeElement !== searchInputRef.current) {
          event.preventDefault();
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="form text-(--dark)"
      >
        <button>
          <svg
            width={17}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input ref={searchInputRef} className="input" placeholder="Search" type="text" />
        <button className="reset" type="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
