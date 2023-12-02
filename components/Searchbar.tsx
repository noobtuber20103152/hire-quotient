import { searchItems } from "@/store/slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Searchbar() {
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      dispatch(searchItems({ query: query }));
      return;
    }
  };
  return (
    <>
      <div className="max-w-md">
        <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            onChange={(e: any) => {
              setQuery(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={query}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
}

export default Searchbar;
