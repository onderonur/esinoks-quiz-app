import React from "react";
import {
  IconButton,
  DialogContentText,
  Box,
  Typography,
  makeStyles
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BaseMenu from "components/BaseMenu";
import RouterLink from "components/RouterLink";
import { deleteQuiz } from "actions";
import useConfirmDialog from "hooks/useConfirmDialog";
import { selectors } from "reducers";
import CopyToClipboard from "components/CopyToClipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const useStyles = makeStyles(theme => ({
  copyToClipboardButton: {
    marginLeft: theme.spacing(1)
  }
}));

const QuizListItemMenu = ({ quizId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useConfirmDialog();
  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));
  const { authUser } = useSelectAuthUser();

  const isAuthor = authUser.uid === quiz.authorId;

  const menuItemsForAuthor = isAuthor
    ? [
        {
          key: "edit",
          title: "Düzenle",
          to: `/profile/quiz/${quizId}`,
          component: RouterLink
        },
        {
          key: "delete",
          title: "Sil",
          onClick: () => {
            confirm({
              title: "Quiz'i Sil?",
              description: `"${quiz.title}" isimli quiz ve tüm soruları silinecektir.`,
              confirmText: "Sil",
              onConfirm: () => dispatch(deleteQuiz(quizId))
            });
          }
        }
      ]
    : [];

  return (
    <BaseMenu
      renderTrigger={({ onClick }) => (
        <IconButton onClick={onClick}>
          <MoreVertIcon />
        </IconButton>
      )}
      menuItems={[
        {
          key: "share",
          title: "Paylaş",
          onClick: () => {
            confirm({
              title: "Quiz Paylaşım Kodu",
              hideCancel: true,
              description: (
                <>
                  <DialogContentText>
                    Aşağıdaki kodu kopyalayıp paylaşarak istediğiniz kişilerin
                    kolayca bu quiz'e ulaşmasını sağlayabilirsiniz.
                  </DialogContentText>
                  <Box display="flex" alignItems="center">
                    <Typography>{quizId}</Typography>
                    <CopyToClipboard>
                      {({ copy }) => (
                        <IconButton
                          className={classes.copyToClipboardButton}
                          onClick={() => copy(quizId)}
                        >
                          <FileCopyIcon />
                        </IconButton>
                      )}
                    </CopyToClipboard>
                  </Box>
                </>
              )
            });
          }
        },
        ...menuItemsForAuthor
      ]}
    />
  );
};

export default QuizListItemMenu;
