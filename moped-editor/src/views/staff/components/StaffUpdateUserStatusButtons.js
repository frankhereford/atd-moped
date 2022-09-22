import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useUserApi,
  roleLooksGood,
  passwordLooksGood,
  fieldParsers,
  nonLoginUserRole,
} from "../helpers";

import { Button, Typography, Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  formButton: {
    margin: theme.spacing(1),
    color: "white",
  },
  formButtonGreen: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

/**
 * Generates a button to inactivate or activate an existing user AND register/activate a non-login user
 * @param {string} userCognitoId - The User's Cognito UUID (if available)
 * @param {function} setModalState - set the modal's details
 * @param {function} handleCloseModal - callback that fires on modal close
 * @param {string} email - user's email
 * @param {string} password - new password required in form for user activate
 * @param {array} roles - user roles to create DynamoDB claims entry
 * @param {boolean} isUserActive - tells us if we are activating or deactivating
 * @param {boolean} isNonLoginUser - tells us if we are converting a non-login user to Moped user
 * @returns {JSX.Element}
 * @constructor
 */
const StaffUpdateUserStatusButtons = ({
  userCognitoId,
  setModalState,
  handleCloseModal,
  email,
  password,
  roles,
  isUserActive,
  isNonLoginUser,
}) => {
  const classes = useStyles();
  let navigate = useNavigate();

  /**
   * Make use of the useUserApi to retrieve the requestApi function and
   * api request loading state and errors from the api.
   */
  const { requestApi } = useUserApi();

  /**
   * Send a request to the user activation route of the Moped API
   */
  const handleUserActivation = () => {
    const rolesParser = fieldParsers["roles"];
    // The backend uses an array for roles
    const rolesArray = rolesParser(roles);

    const data = {
      email,
      password,
      roles: rolesArray,
    };

    // Navigate to user table on success
    const callback = () => navigate("/moped/staff");

    requestApi({
      method: "put",
      path: "/users/activate/",
      payload: data,
      callback,
    });
  };

  /**
   * Handler for Delete Confirm button
   */
  const handleDeleteConfirm = () => {
    const requestPath = "/users/" + userCognitoId;
    const deleteCallback = () => {
      handleCloseModal();
      navigate("/moped/staff/");
    };

    requestApi({
      method: "delete",
      path: requestPath,
      callback: deleteCallback,
    });
  };

  /**
   * Send a request to the user activation route of the Moped API
   */
  const handleNonLoginUserActivation = () => {
    const rolesParser = fieldParsers["roles"];
    // Update role to editor since we are activating a non-login user
    const rolesArray = rolesParser("moped-editor");

    const data = {
      email,
      password,
      roles: rolesArray,
    };

    // Navigate to user table on success
    const callback = () => navigate("/moped/staff");

    requestApi({
      method: "put",
      path: "/users/activate/",
      payload: data,
      callback,
    });
  };

  /**
   * Handle Activate User Confirm
   */
  const handleActivateConfirm = () => {
    if (!passwordLooksGood(password)) {
      setModalState({
        open: true,
        title: "Error",
        message: (
          <Typography>
            The password is required when activating a user. It needs to be 8
            characters long, it must include at least one lower-case,
            upper-case, one number, and one symbol characters.
          </Typography>
        ),
        action: handleCloseModal,
        actionButtonLabel: "Ok",
        hideCloseButton: true,
      });
    } else if (!roleLooksGood(roles)) {
      setModalState({
        open: true,
        title: "Error",
        message: "The role is required when activating a user.",
        action: handleCloseModal,
        actionButtonLabel: "Ok",
        hideCloseButton: true,
      });
    } else {
      handleUserActivation();
      setModalState({
        open: true,
        title: "Activating",
        message: (
          <Box display="flex" justifyContent="flex-start">
            <Typography>Please Wait...</Typography>
          </Box>
        ),
        action: handleCloseModal,
        actionButtonLabel: null,
        hideActionButton: true,
        hideCloseButton: true,
      });
    }
  };

  /**
   * Handle Activate Non-login User Confirm
   */
  const handleActivateNonLoginUserConfirm = () => {
    if (!passwordLooksGood(password)) {
      setModalState({
        open: true,
        title: "Error",
        message: (
          <Typography>
            The password is required when activating a user. It needs to be 8
            characters long, it must include at least one lower-case,
            upper-case, one number, and one symbol characters.
          </Typography>
        ),
        action: handleCloseModal,
        actionButtonLabel: "Ok",
        hideCloseButton: true,
      });
    } else if (!roleLooksGood(roles)) {
      setModalState({
        open: true,
        title: "Error",
        message: "The role is required when activating a user.",
        action: handleCloseModal,
        actionButtonLabel: "Ok",
        hideCloseButton: true,
      });
    } else {
      handleNonLoginUserActivation();
      setModalState({
        open: true,
        title: "Activating",
        message: (
          <Box display="flex" justifyContent="flex-start">
            <Typography>Please Wait...</Typography>
          </Box>
        ),
        action: handleCloseModal,
        actionButtonLabel: null,
        hideActionButton: true,
        hideCloseButton: true,
      });
    }
  };

  /**
   * Activate User
   */
  const handleActivateUser = () => {
    setModalState({
      open: true,
      title: "Activate user?",
      message: "Do you want to activate this user?",
      action: handleActivateConfirm,
    });
  };

  /**
   * Handles the deactivation of user
   */
  const handleDeactivateUser = () => {
    setModalState({
      open: true,
      title: "Inactivate this user?",
      message: "Are you sure that you want to inactivate this user?",
      action: handleDeleteConfirm,
    });
  };

  /**
   * Handles the activation of a non-login user
   */
  const handleActivateNonLoginUser = () => {
    setModalState({
      open: true,
      title: "Activate this non-login user?",
      message: "Do you want to activate this non-login user?",
      action: handleActivateNonLoginUserConfirm,
    });
  };

  return (
    <>
      {isUserActive === true && isNonLoginUser === false && (
        <Button
          className={classes.formButton}
          color="secondary"
          variant="contained"
          onClick={handleDeactivateUser}
        >
          Inactivate User
        </Button>
      )}
      {isUserActive === false && (
        <Button
          className={clsx(classes.formButton, classes.formButtonGreen)}
          variant="contained"
          onClick={handleActivateUser}
        >
          Activate User
        </Button>
      )}
      {isNonLoginUser === true && roles === nonLoginUserRole && (
        <Button
          className={clsx(classes.formButton, classes.formButtonGreen)}
          variant="contained"
          onClick={handleActivateNonLoginUser}
        >
          Activate Non-login User
        </Button>
      )}
    </>
  );
};

export default StaffUpdateUserStatusButtons;
