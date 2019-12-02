import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import QuizList from "./QuizList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUserQuizzes } from "actions";
import { selectors } from "reducers";

const ProfileQuizList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authUserQuizIds = useSelector(state =>
    selectors.selectAuthUserQuizIds(state)
  );
  const { isFetching } = useSelector(state =>
    selectors.selectAsyncInfoAuthUserQuizzes(state)
  );

  useEffect(() => {
    dispatch(fetchAuthUserQuizzes());
  }, [dispatch]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push("/profile/quiz/new")}
        >
          Yeni Quiz
        </Button>
      </Box>
      <QuizList quizIds={authUserQuizIds} loading={isFetching} />
    </>
  );
};

export default ProfileQuizList;
