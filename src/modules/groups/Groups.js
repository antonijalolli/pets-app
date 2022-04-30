import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  Hidden,
  TableRow,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GroupsRepository } from "./GroupsRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { COMMON_ACTIONS } from "../common/CommonActions";
import { useDispatch } from "react-redux";
import { AuthService } from "../auth/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Groups = () => {
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  const dispatch = useDispatch();
  const [selectedGroup, setSelectedGroup] = useState();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (group) => {
    setSelectedGroup(group);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    GroupsRepository.getAll(page, size)
      .then((res) => {
        setLoading(false);
        setGroups(res.data);
        dispatch({
          type: COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE,
          payload: { showSuccessMessage: "Fetch groups done successfully" },
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 10);
  };
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Grid
        conatiner
        spacing={2}
        style={{
          backgroundColor: "#f1f2f6",
          height: "132px",
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
                Groups
              </span>
            </Grid>
          </Grid>
        </Grid>
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
                  setRedirectTo(`/groups/create`);
                }}
              >
                CREATE NEW GROUP
              </Button>
            </Grid>
          )}
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
                groups?.content?.map((group, index) => (
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
                          fontSize: "16px",
                          width: "900px",
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 0 ? "#F4F6F6" : "transparent",
                        }}
                        onClick={() => {
                          setRedirectTo(`/groups/details/${group.id}`);
                        }}
                      >
                        {group.name}
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
                          setRedirectTo(`/groups/details/${group.id}`);
                        }}
                      >
                        {group.name}
                      </TableCell>
                    </Hidden>

                    <TableCell
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <EditIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/groups/edit/${group?.id}`);
                        }}
                      ></EditIcon>

                      <DeleteIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                          color: "#D35400",
                        }}
                        onClick={() => handleClickOpen(group)}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Grid container spacing={2}>
            <Grid item={12} style={{ marginLeft: "auto", marginRight: "auto" }}>
              {groups && groups.number !== undefined && (
                <Stack spacing={2} style={{ marginTop: "20px" }}>
                  <Pagination
                    color="warning"
                    count={Math.floor(groups?.totalElements / groups?.size) + 1}
                    showFirstButton
                    showLastButton
                    style={{
                      color: "#D35400",
                    }}
                    page={groups.number + 1}
                    onChange={handleChange}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
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
          Are you sure you want to delete this group? This action
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
              setRedirectTo(`/groups/delete/${selectedGroup?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
