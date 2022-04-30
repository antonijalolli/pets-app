import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { AuthService } from "../auth/AuthService";
import {
  DialogContentText,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  DialogActions,
  Alert,
  Chip,
  Snackbar,
  IconButton,
  Hidden,
  Tooltip,
  Fade,
} from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import {
  ChangePasswordUserValidator,
  UpdateUserValidator,
} from "./UserValidator";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export const MyProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [redirectTo, setRedirectTo] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(false);
  };

  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadById(AuthService.getCurrentUser()?.id);
  }, []);

  const loadById = (id) => {
    setLoading(true);
    UsersRepository.get(id)
      .then((res) => {
        setUser(res.data);

        setLoading(false);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSubmitPassword = () => {
    let valid = ChangePasswordUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      ChangePasswordUserValidator.validate(user, { abortEarly: false }).catch(
        (err) => {
          console.log(err.inner);
          err.inner.forEach((validationError) => {
            validationErrors[validationError.path] = {};
            validationErrors[validationError.path] = validationError.message;
          });
          console.log(validationErrors);
          setFormFieldErrors(validationErrors);
          return;
        }
      );

      return;
    }
    handleClose();
    setLoading(true);
    setGlobalFormError(null);
    setSuccessMessage(null);
    UsersRepository.updateUser(user?.id, user)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Password is changed");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setGlobalFormError(err);
        console.log("not changed");
      });
  };
  const handleSubmit = () => {
    let valid = UpdateUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
        console.log(err.inner);
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = {};
          validationErrors[validationError.path] = validationError.message;
        });
        console.log(validationErrors);
        setFormFieldErrors(validationErrors);
        return;
      });
      return;
    }
    setLoading(true);
    setGlobalFormError(null);

    UsersRepository.updateUser(user?.id, user)
      .then((res) => {
        console.log(res);
        setSuccessMessage("User info is updated");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setGlobalFormError(err);
        console.log("not changed");
      });
  };
  const handleChangeUserData = (name, value) => {
    let data = { ...user };
    data[name] = value;
    setUser(data);
    console.log(data);
  };
  const [openMessage, setOpenMessage] = React.useState(false);

  const handleClick = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setSuccessMessage(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Container maxWidth="xs">
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
          <PersonOutlineIcon sx={{ fontSize: 100, color: "#17202A" }} />{" "}
          <h2
            style={{
              fontFamily: "Helvetica, sans-serif",
              color: "#1F393C",
              marginTop: "5px",
            }}
          >
            {AuthService.getCurrentUser()?.firstName}{" "}
            {AuthService.getCurrentUser()?.lastName}{" "}
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Tooltip
                title="Edit your profile"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                placement="bottom"
              >
                <EditIcon
                  style={{ color: "#D35400", cursor: "pointer" }}
                  onClick={() => {
                    setRedirectTo(`/users/edit/${user?.id}`);
                  }}
                />
              </Tooltip>
            )}
          </h2>
        </Grid>
      </Container>
      <Divider></Divider>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <h3
            style={{
              fontFamily: "Verdana, sans-serif",
              color: "#1F393C",
              fontSize: "16px",
            }}
          >
            Account Info
          </h3>
          <Divider></Divider>
          <Grid
            style={{
              marginTop: "5px",
              fontSize: "18px",
              fontFamily: "Verdana, sans-serif",
              color: "#566573",
            }}
          >
            <Grid item xs={12} md={12}>
              <span style={{ fontSize: "14px" }}>First Name</span>
              <TextField
                margin="dense"
                id="name"
                color="warning"
                fullWidth
                variant="outlined"
                size="small"
                value={user?.firstName ? user?.firstName : ""}
                onChange={(e) =>
                  handleChangeUserData("firstName", e.target.value)
                }
                error={formFieldErrors?.firstName}
                helperText={formFieldErrors?.firstName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <span style={{ fontSize: "14px" }}>Last Name</span>

              <TextField
                fullWidth
                margin="dense"
                id="name"
                color="warning"
                size="small"
                variant="outlined"
                value={user?.lastName ? user?.lastName : ""}
                onChange={(e) =>
                  handleChangeUserData("lastName", e.target.value)
                }
                error={formFieldErrors?.lastName}
                helperText={formFieldErrors?.lastName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <span style={{ fontSize: "14px" }}>Username</span>

              <TextField
                margin="dense"
                id="name"
                fullWidth
                color="warning"
                disabled
                variant="outlined"
                size="small"
                value={user?.username ? user?.username : ""}
                onChange={(e) =>
                  handleChangeUserData("username", e.target.value)
                }
                error={formFieldErrors?.username}
                helperText={formFieldErrors?.username}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <span style={{ fontSize: "14px" }}>Email</span>

              <TextField
                margin="dense"
                id="name"
                disabled
                color="warning"
                fullWidth
                variant="outlined"
                size="small"
                value={user?.email ? user?.email : ""}
                onChange={(e) => handleChangeUserData("email", e.target.value)}
                error={formFieldErrors?.email}
                helperText={formFieldErrors?.email}
              />
            </Grid>
            <span style={{ fontSize: "14px" }}>Phone number</span>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="name"
                color="warning"
                variant="outlined"
                size="small"
                fullWidth
                value={user?.phoneNumber ? user?.phoneNumber : ""}
                onChange={(e) =>
                  handleChangeUserData("phoneNumber", e.target.value)
                }
                error={formFieldErrors?.phoneNumber}
                helperText={formFieldErrors?.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Hidden smDown>
                <Button
                  fullWidth
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#2DA44E",
                    float: "right",
                    marginRight: "-380px",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Update Profile
                </Button>
              </Hidden>
              <Hidden smUp>
                <Button
                  fullWidth
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#2DA44E",
                    float: "right",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Update Profile
                </Button>
              </Hidden>
            </Grid>
            {globalFormError && (
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Alert severity="error" variant="filled">
                  {globalFormError?.response?.data?.message}
                </Alert>
              </Grid>
            )}
            {/* {successMessage && (
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Alert severity="success">{successMessage}</Alert>
              </Grid>
            )} */}

            {successMessage && (
              <Hidden smUp>
                <Grid item fullWidth xs={12} md={12} style={{}}>
                  <Alert
                    severity="success"
                    variant="filled"
                    style={{ borderRadius: 0 }}
                  >
                    {successMessage}
                  </Alert>
                </Grid>
              </Hidden>
            )}
          </Grid>
          {successMessage && (
            <Hidden smDown>
              <Grid item fullWidth xs={12} md={7.5} style={{}}>
                <Alert
                  severity="success"
                  variant="filled"
                  style={{ borderRadius: 0 }}
                >
                  {successMessage}
                </Alert>
              </Grid>
            </Hidden>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <h3
            style={{
              fontFamily: "Verdana, sans-serif",
              color: "#1F393C",
              fontSize: "16px",
            }}
          >
            Change password
          </h3>
          <Divider></Divider>
          <Chip
            variant="outlined"
            label="Change password"
            onClick={handleClickOpen}
            style={{ marginTop: "10px", float: "right " }}
          ></Chip>
          <Dialog open={open}>
            {globalFormError && (
              <Alert severity="error">
                {globalFormError?.response?.data?.message}
              </Alert>
            )}

            <Grid item xs={12} style={{ backgroundColor: "black" }}>
              <DialogTitle
                style={{
                  color: "white",
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Change Password
                <IconButton
                  size="small"
                  style={{
                    float: "right",
                    color: "white",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon
                    style={{ fontSize: 20, marginTop: "-3px" }}
                  ></CloseIcon>
                </IconButton>
              </DialogTitle>
            </Grid>
            <DialogContent>
              <DialogContentText
                style={{ fontFamily: "Verdana, sans-serif", fontSize: "14px" }}
              >
                To change your password please insert new password and then
                submit.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="password"
                fullWidth
                color="warning"
                variant="standard"
                onChange={(e) =>
                  handleChangeUserData("newPassword", e.target.value)
                }
                error={formFieldErrors?.newPassword}
                helperText={formFieldErrors?.newPassword}
              />
              <TextField
                margin="dense"
                id="name"
                // onKeyPress={(e) => {
                //   if (e.key === "Enter") {
                //     handleSubmitPassword();
                //   }
                // }}
                label="Confirm Password"
                type="password"
                color="warning"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  handleChangeUserData("confirmPassword", e.target.value)
                }
                error={formFieldErrors?.confirmPassword}
                helperText={formFieldErrors?.confirmPassword}
              />
            </DialogContent>

            <DialogActions>
              {/* <Button onClick={handleClose}>Close</Button> */}
              <Hidden smDown>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    handleSubmitPassword();
                  }}
                  style={{
                    backgroundColor: "#2DA44E",
                    marginRight: "15px",
                    marginTop: "-20px",
                  }}
                >
                  Submit
                </Button>
              </Hidden>

              <Hidden smUp>
                <Grid
                  item
                  xs={11}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleSubmitPassword();
                    }}
                    style={{
                      backgroundColor: "#2DA44E",
                      marginRight: "15px",
                      marginTop: "-20px",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Hidden>
              <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleCloseMessage}
                message="Password changed"
                action={action}
              />
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
