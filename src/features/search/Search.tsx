import { useState, useEffect } from "react";
import { useSearch } from "../../hooks/useSearch";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { searchQuestions } from "../../store/questions/questionsSlice";

const Search = () => {
  const isSearch = useAppSelector((state) => state.questions.isSearch);
  const { selectedTag } = useSearch();
  const { searchString, setSearchString } = useSearch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSearch)
      dispatch(searchQuestions({ tagged: selectedTag, body: searchString }));
  }, [selectedTag]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchString(e.target.value);
    dispatch(searchQuestions({ tagged: selectedTag, body: e.target.value }));
  };

  const handleClick = () => {
    dispatch(searchQuestions({ tagged: selectedTag, body: searchString }));
  };

  return (
    <div className="bg-white">
      <div className="flex w-full border border-blue-300 rounded-2xl">
        <input
          className="w-[90%] p-4 border-none focus-visible:outline-none rounded-2xl"
          placeholder="tag"
          value={searchString}
          onChange={handleSearch}
        />
        <div className="bg-blue-300 rounded-r-2xl w-[10%] flex justify-center items-center">
          <button onClick={handleClick} className="w-full">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
