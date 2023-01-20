import Tags from "../features/tags/Tags";
import Questions from "../features/questions/Questions";
import Search from "../features/search/Search";

const QuestionPage = () => {
  return (
    <div className="mx-auto w-2/3">
      <Search />
      <Tags />
      <Questions />
    </div>
  );
};

export default QuestionPage;
