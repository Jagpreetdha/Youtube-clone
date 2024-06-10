import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";

function Head() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showsuggestion, setShowSuggestion] = useState(false);
  const dispatch = useDispatch()
  const searchCache = useSelector(store=>store.search)

  useEffect(() => {
    if (searchQuery === "") {
      setSuggestions([]);
      return;
    }
    // example what searchCache would look like
    // searchCache = {
    //   "iphone":["iphone 11","iphone 14"]
    // }

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  async function getSearchSuggestions() {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await response.json();
      setSuggestions(json[1]);
      dispatch(cacheResults({
        [searchQuery]:json[1]
      }))
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  }

  function handleClick() {
    dispatch(toggleMenu());
  }

  return (
    <div className="grid grid-flow-col p-4 shadow-md sticky top-0 bg-white">
      <div className="flex col-span-1 gap-5">
        <img
          className="h-8 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
          alt="menu"
          onClick={handleClick}
        />
        <img
          className="h-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rN6gEMMRsfMcXyCCDZoUT34KT6248y3lnw&s"
          alt="youtube-icon"
        />
      </div>
      <div className="col-span-10 px-10 ">
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="w-2/5 border border-gray-400 rounded-l-full p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className=" bg-gray-100 rounded-r-full p-2">🔍</button>
        </div>
        {showsuggestion && suggestions.length > 0 && (
          <div className="flex items-center mx-[315px] px-3 py-3 w-[27rem] bg-white shadow-lg rounded border border-gray-100 absolute z-10">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="border-b-2 border-b-slate-200 py-1 w-[24rem] hover:bg-gray-100">
                  🔍 {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1 ">
        <img
          className="h-8"
          src="https://cdn-icons-png.freepik.com/256/1077/1077063.png?semt=ais_hybrid"
          alt="user-icon"
        />
      </div>
    </div>
  );
}

export default Head;
