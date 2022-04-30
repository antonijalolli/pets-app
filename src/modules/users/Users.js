import {
  Alert,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  Hidden,
  Dialog,
  DialogTitle,
  DialogActions,
  TableCell,
  TableRow,
  Link,
  Button,
  Container,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthService } from "../auth/AuthService";
import { useDispatch } from "react-redux";
import { COMMON_ACTIONS } from "../common/CommonActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import img from "../images/petsimage.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    loadData(0, 10);
  }, []);
  useEffect(() => {
    loadData(0, 10);
  }, [searchParams]);

  const handleChangeSearchParams = (key, value) => {
    let data = { ...searchParams };
    data[key] = value;
    setSearchParams(data);
  };

  const loadData = (page, size) => {
    setLoading(true);
    let filterParams = { ...searchParams };
    UsersRepository.getAll(page, size, filterParams)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        dispatch({
          type: COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE,
          payload: { showSuccessMessage: "Fetch users done successfully" },
        });
      })
      .catch((err) => {
        console.log(err.response.data.status, err.response.data.message);
        if (err?.response?.data?.status === 403) {
          navigate("/forbidden");
        } else {
          console.log(err);
        }
        setLoading(false);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 10);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#F1F2F6",
          }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Copperplate, fantasy",
                    fontSize: "30px",
                    color: "#0B648A",
                    display: "block",
                    paddingTop: "50px",
                    textTransform: "uppercase",
                  }}
                >
                  Users
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            {window?.localStorage?.getItem("auth") &&
              AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Grid
                  item
                  xs={12}
                  md={2.5}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "-20px",
                  }}
                >
                  <Button
                    size="medium"
                    variant="outlined"
                    fullWidth
                    style={{
                      color: "white",
                      borderColor: "white",
                      backgroundColor: "#D35400",
                      marginTop: "20px",
                    }}
                    onClick={() => {
                      setRedirectTo(`/users/create`);
                    }}
                  >
                    CREATE NEW USER
                  </Button>
                </Grid>
              )}
          </Hidden>
          <Hidden smUp>
            {window?.localStorage?.getItem("auth") &&
              AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Grid
                  item
                  xs={12}
                  md={2.5}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "-20px",
                  }}
                >
                  <Button
                    style={{
                      color: "white",
                      float: "right",
                      marginRight: "-10px",
                      marginTop: "-10px",
                    }}
                    onClick={() => {
                      setRedirectTo(`/users/create`);
                    }}
                  >
                    <AddIcon
                      fullWidth
                      variant="contained"
                      style={{
                        float: "right",
                        backgroundColor: "#D35400",
                        marginRight: "25px",
                        marginTop: "20px",
                      }}
                    ></AddIcon>
                  </Button>
                </Grid>
              )}
          </Hidden>
          <Grid container spacing={0.5}>
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="First Name"
                size="small"
                color="warning"
                placeholder="Search by first name"
                value={searchParams?.firstName ? searchParams?.firstName : ""}
                onChange={(e) => {
                  handleChangeSearchParams("firstName", e.target.value);
                }}
                style={{ marginTop: "10px" }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Last Name"
                size="small"
                color="warning"
                placeholder="Search by last name"
                value={searchParams?.lastName ? searchParams?.lastName : ""}
                onChange={(e) => {
                  handleChangeSearchParams("lastName", e.target.value);
                }}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              {loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    marginTop: "150px",
                  }}
                >
                  <CircularProgress style={{ color: "black" }} />
                </div>
              )}
              {!loading &&
                users?.content?.map((user, index) => (
                  <TableRow
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        index % 2 === 0 ? "#F4F6F6" : "transparent",
                    }}
                  >
                    <Hidden smDown>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "18px",
                          width: "900px",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/details/${user.id}`);
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </TableCell>
                    </Hidden>
                    <Hidden smUp>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/details/${user.id}`);
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </TableCell>
                    </Hidden>

                    <TableCell
                      width="160px"
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <EditIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                          marginRight: "-30px",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/edit/${user?.id}`);
                        }}
                      ></EditIcon>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <DeleteIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                          color: "#D35400",
                        }}
                        onClick={() => handleClickOpen(user)}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item={12} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {users && users.number !== undefined && (
            <Stack spacing={2} style={{ marginTop: "20px" }}>
              <Pagination
                color="warning"
                count={Math.floor(users?.totalElements / users?.size) + 1}
                showFirstButton
                showLastButton
                style={{
                  color: "#D35400",
                }}
                page={users.number + 1}
                onChange={handleChange}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <HighlightOffIcon
          style={{
            color: "#F15E5E",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "70px",
            marginTop: "10px",
          }}
        />
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontFamily: "Monaco, monospace",
          }}
        >
          {"Confirm delete"}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          Are you sure you want to delete this user? This action
          <br /> cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            style={{
              backgroundColor: "#C1C1C1",
              color: "white",
              border: "#C1C1C1",
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "#F15E5E",
              color: "white",
            }}
            onClick={() => {
              setRedirectTo(`/users/delete/${selectedUser?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
