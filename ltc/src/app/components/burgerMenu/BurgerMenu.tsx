"use client";

import Burger from "./elements/Burger";
import Menu from "./elements/Menu";
import Close from "./elements/Close";

import { useGlobalState } from "@/app/contexts/GlobalStateContext";
import { useEffect } from "react";

export default function BurgerMenu() {
  //need globally accessible states to track if menu is open, toggle menu and
  const { isMenuOpen, toggleMenu, exitMenu } = useGlobalState();
  useEffect(() => {
    if (isMenuOpen) {
      //if menu is open, remove the scrolling feature
      document.body.classList.add("overflow-y-hidden");
    } else {
      //if not, remove the class that takes away scroll ability
      document.body.classList.remove("overflow-y-hidden");
    }
    //this triggers exitMenu function when
    window.addEventListener("resize", exitMenu);

    //this is a clean-up function to remove this function when the burger menu is not rendered
    return () => {
      window.removeEventListener("resize", exitMenu);
    };
  }, [isMenuOpen]);

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
