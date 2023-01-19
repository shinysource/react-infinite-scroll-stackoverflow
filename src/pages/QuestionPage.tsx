import Tags from "../features/tags/Tags";
import Questions from "../features/questions/Questions";

const QuestionPage = () => {
  return (
    <div className="mx-auto w-2/3">
      <Tags />
      <Questions />
    </div>
  );
};

export default QuestionPage;
