import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchTags, selectTags } from "../store/tags/tagsSlice";

export const useSearch = () => {
  const tags = useAppSelector(selectTags);
  const [searchString, setSearchString] = useState("");
  const dispatch = useAppDispatch();
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    setSelectedTag(tags[0]);
  }, [tags]);

  const handleTag = (tag: string) => {
    console.log(tag);
    setSelectedTag(tag);
  };

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return {
    searchString,
    setSearchString,
    tags,
    selectedTag,
    handleTag,
  };
};
