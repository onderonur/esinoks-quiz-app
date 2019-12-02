import React, { useEffect } from "react";
import QuizGameQuestionList from "./QuizGameQuestionList";
import ActiveQuestionDialog from "./ActiveQuestionDialog";
import Journey from "./Journey";
import { useParams, Prompt } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import { useSelector, useDispatch } from "react-redux";
import { exitFromQuiz, fetchQuiz, fetchQuizQuestions } from "actions";
import { makeStyles, Container } from "@material-ui/core";
import { selectors } from "reducers";
import { useHistory } from "react-router-dom";
import BaseDivider from "components/BaseDivider";
import useDetectMobile from "hooks/useDetectMobile";
import QuizTitle from "./QuizTitle";

const SIDEBAR_WIDTH = 96;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  sidebar: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    display: "flex",
    flexDirection: "column"
  },
  sidebarContent: {
    overflow: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  offset: theme.mixins.toolbar,
  content: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: ({ isMobile }) => (isMobile ? 0 : SIDEBAR_WIDTH),
    width: ({ isMobile }) =>
      isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  horizontalList: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1)
  }
}));

const QuizGamePage = () => {
  const isMobile = useDetectMobile();
  const classes = useStyles({ isMobile });
  const dispatch = useDispatch();
  const history = useHistory();
  const { quizId } = useParams();
  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));
  const { isFetching } = useSelector(state =>
    selectors.selectAsyncInfoQuiz(state, quizId)
  );

  useEffect(() => {
    dispatch(fetchQuiz(quizId, history));
    dispatch(fetchQuizQuestions(quizId));
    // When user leaves this page, we clean the quiz state from the store.
    // Otherwise, when the user leaves the quiz and re-enters this page,
    // the previous answers would still be in the store.
    return () => {
      dispatch(exitFromQuiz(quizId));
    };
  }, [dispatch, history, quizId]);

  return isFetching || !quiz ? (
    <LoadingIndicator loading />
  ) : (
    <>
      <Prompt
        when={true}
        message="Sayfadan çıktığınızda verdiğiniz cevaplar silinecektir. Devam etmek istediğinize emin misiniz?"
      />
      <div className={classes.root}>
        {!isMobile && (
          <div className={classes.sidebar}>
            <div className={classes.offset} />
            <div className={classes.sidebarContent}>
              <QuizGameQuestionList />
            </div>
          </div>
        )}
        <Container maxWidth="lg" className={classes.content}>
          <div className={classes.offset} />
          <Journey />
          <QuizTitle quizId={quizId} />
          <BaseDivider dense />
          <div style={{ overflow: "auto", flex: 1 }}>
            <ActiveQuestionDialog />
          </div>
          {isMobile && (
            <div className={classes.horizontalList}>
              <QuizGameQuestionList />
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default QuizGamePage;
