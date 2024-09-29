"use client";

import Burger from "./elements/Burger";
import Menu from "./elements/Menu";
import Close from "./elements/Close";

import { useGlobalState } from "@/contexts/GlobalStateContext";
import { useEffect } from "react";

export default function BurgerMenu() {
  const { isMenuOpen, toggleMenu, exitMenu } = useGlobalState();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    window.addEventListener("resize", exitMenu);

    return () => {
      window.removeEventListener("resize", exitMenu);
    };
  }, [isMenuOpen, exitMenu]);

  return (
    <div className="md:hidden">
      <div className="fixed top-0 left-0 p-2 z-50" onClick={toggleMenu}>
        {isMenuOpen ? <Close /> : <Burger />}
      </div>
      {isMenuOpen ? (
        <div className="flex justify-between pt-20 fixed flex-col text-white text-4xl pl-5 bg-black backdrop-blur-md bg-opacity-40 w-full h-full z-40">
          <Menu />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
