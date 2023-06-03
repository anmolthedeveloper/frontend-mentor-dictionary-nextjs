"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Search() {
  // https://api.dictionaryapi.dev/api/v2/entries/en/keyboard
  const inputElement = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");

  const handleButtonClick = (searchTerm: any) => {
    // Called when button is clicked
    if (searchTerm === "") setIsEmpty(true);
    else {
      setIsEmpty(false);
    }
  };

  useEffect(() => {
    const element = inputElement.current;

    if (!element) return;

    element.addEventListener("focusout", (event) => {
      setIsEmpty(false);
    });
    element.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed

        handleButtonClick(event.target!.value);

        // Trigger the button element with a click
      }
    });
  }, []);

  return (
    <div>
      <form
        className="flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative w-full">
          <input
            type="text"
            className={`bg-lightGrayCustom bg-opacity-50 text-gray-900 text-lg rounded-lg ${
              isEmpty ? "ring-red-500" : "focus:ring-purpleCustom"
            }  focus:outline-none focus:ring-1 block w-full p-5  dark:bg-darkGrayCustom dark:placeholder-gray-400 dark:text-white caret-purpleCustom font-bold`}
            placeholder="Search for any word..."
            ref={inputElement}
            onChange={(e) => {
              setIsEmpty(false);
              setSearchTxt(e.target!.value);
            }}
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Image
              alt="search icon"
              width={1000}
              height={1000}
              src={"./images/icon-search.svg"}
              className="w-5 h-5 hover:cursor-pointer"
            />
          </div>
        </div>
      </form>
      <p className={`text-red-500 ${isEmpty ? "block" : "hidden"}`}>
        Whoops, can’t be empty…
      </p>
    </div>
  );
}
