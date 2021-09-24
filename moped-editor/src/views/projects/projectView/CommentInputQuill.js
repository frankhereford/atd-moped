import React from "react";
import { Box, Button, Container, Grid } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import ProjectSaveButton from "../newProjectView/ProjectSaveButton";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  cancelButton: {
    margin: theme.spacing(1),
    position: "relative",
    color: theme.palette.secondary.dark,
  },
}));

const CommentInputQuill = ({
  noteText,
  setNoteText,
  editingComment,
  commentAddLoading,
  commentAddSuccess,
  submitNewComment,
  submitEditComment,
  cancelCommentEdit,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid xs={12} sm={12} container direction="column" spacing={1}>
        <Grid item>
          <Box pt={2}>
            <ReactQuill
              theme="snow"
              value={noteText}
              onChange={setNoteText}
              modules={quillModules}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box pb={2} display="flex" style={{ justifyContent: "flex-end" }}>
            {editingComment && (
              <div className={classes.cancelButton}>
                <Button variant="text" onClick={cancelCommentEdit}>
                  Cancel
                </Button>
              </div>
            )}
            <ProjectSaveButton
              label={
                <>
                  Save
                </>
              }
              loading={commentAddLoading}
              success={commentAddSuccess}
              handleButtonClick={
                editingComment ? submitEditComment : submitNewComment
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentInputQuill;
