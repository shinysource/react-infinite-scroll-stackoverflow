import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchTags, selectTags } from "../store/tags/tagsSlice";

export const useTags = () => {
  const tags = useAppSelector(selectTags);
  const dispatch = useAppDispatch();
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    setSelectedTag(tags[0]);
  }, [tags]);

  const handleTag = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return {
    tags,
    selectedTag,
    handleTag,
  };
};
