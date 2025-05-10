import LinkAnim from "../../LinkAnim";
import "./Nav.css";
import { useEffect, useState } from "react";
import PokemonImg from "../../../assets/Pokemon_Logo.png";
import useViewportWidth from "../../useViewportWidth";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Nav({ handleReset, handleSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const width = useViewportWidth();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/") {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      className={`flex text-center justify-between relative ${
        isOpen && "isOpen"
      }`}
    >
      {width <= 768 && (
        <Search
          strokeWidth={2.5}
          onClick={handleToggle}
          className="cursor-pointer"
        />
      )}
      <LinkAnim className={"-translate-y-2"}>
        <img src={PokemonImg} alt="PokemonImg" className="h-10" />
      </LinkAnim>
      <SearchBar
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        className={`md:-translate-y-2 md:static md:left-0 md:top-0 md:translate-0 absolute left-[50%] top-[50%] -translate-[50%] transition duration-500 ease-in-out ${
          width <= 768 && `${isOpen ? "translate-y-1" : "-translate-y-25"}`
        }`}
      />
      {width <= 768 && (
        <Search strokeWidth={2.5} className="text-transparent" />
      )}
    </nav>
  );
}
