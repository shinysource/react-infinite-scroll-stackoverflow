import axios from "axios";

const baseURL = process.env.REACT_APP_STACKOVERFLOW_BASE_URL;
const instance = axios.create({
  baseURL,
});

const getTags = async () => {
  const response = await instance.get(
    "tags?order=desc&sort=popular&site=stackoverflow"
  );
  return response;
};

const getQuestions = (ids: string) => {
  const response = instance.get(
    `/questions/${ids}?order=desc&sort=activity&site=stackoverflow`
  );
  return response;
};

export { getTags, getQuestions };
