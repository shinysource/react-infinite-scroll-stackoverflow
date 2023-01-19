import { QuestionResponse } from "../../types";

export interface QuestionResponseProps {
  question: QuestionResponse;
}

const ListItem = ({ question }: QuestionResponseProps) => {
  return (
    <div>
      <div>{question.title}</div>
      <div className="flex">
        <div>
          <div className="text-red-700">Score</div>
          <div className={`${question.score < 0 ? "text-red-700" : ""}`}>
            {question.score}
          </div>
        </div>
        <div>
          <div className="text-red">Answers</div>
          <div
            className={`border border-green-700 ${
              question.accepted_answer_id ? "bg-green-700" : "bg-white"
            }`}
          >
            {question.answer_count}
          </div>
        </div>
        <div>
          <div className="text-red-700">Viewed</div>
          <div>{question.view_count}</div>
        </div>
        <div>
          <img
            alt={`${question.owner.user_id}`}
            src={question.owner.profile_image}
          ></img>
          <div>{question.owner.display_name}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
