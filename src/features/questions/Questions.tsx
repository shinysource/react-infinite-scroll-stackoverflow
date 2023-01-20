import React, { CSSProperties, useMemo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchQuestions,
  selectQuestions,
} from "../../store/questions/questionsSlice";
import { useTags } from "../../hooks/useTags";

import ListItem from "../../components/list/ListItem";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export interface QuestionsProps {}

const Questions = () => {
  const { selectedTag } = useTags();
  const isSearch = useAppSelector((state) => state.questions.isSearch);
  const questions = useAppSelector(selectQuestions);
  const status = useAppSelector((state) => state.questions.status);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions(0));
  }, [dispatch]);

  const isLoading = useMemo(() => {
    return status === "loading" ? true : false;
  }, [status]);

  const handleNext = () => {
    dispatch(fetchQuestions(page + 1));
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={questions.length} //This is important field to render the next data
      next={handleNext}
      hasMore={!isSearch}
      loader={
        <ClipLoader
          color="#FF0"
          loading={isLoading}
          cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
      scrollableTarget="scrollableDiv"
    >
      <div className="divide-y">
        {questions.map((question, index) => (
          <ListItem question={question} key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Questions;
