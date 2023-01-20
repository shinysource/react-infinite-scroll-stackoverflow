import { useState, useEffect } from "react";
import { useTags } from "../../hooks/useTags";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { searchQuestions } from "../../store/questions/questionsSlice";

const Search = () => {
  const isSearch = useAppSelector((state) => state.questions.isSearch);
  const { selectedTag } = useTags();
  const [searchString, setSearchString] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSearch)
      dispatch(searchQuestions({ tagged: selectedTag, body: searchString }));
  }, [selectedTag]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchString(e.target.value);
    dispatch(searchQuestions({ tagged: selectedTag, body: searchString }));
  };

  return (
    <div>
      <input value={searchString} onChange={handleSearch} />
    </div>
  );
};

export default Search;
