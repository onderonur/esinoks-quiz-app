import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchQuiz } from "actions";

const useFetchQuiz = quizId => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const isNew = quizId === "new";
    if (!isNew) {
      dispatch(fetchQuiz(quizId, history));
    }
  }, [dispatch, history, quizId]);
};

export default useFetchQuiz;
