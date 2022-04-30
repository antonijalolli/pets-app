import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Hidden,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Slide,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { UsersRepository } from "./UsersRepository";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QRCode from "react-qr-code";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserDetails = ({}) => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedMfaKey, setSelectedMfaKey] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    UsersRepository.get(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function createData(tableCell1, tableCell2) {
    return { tableCell1, tableCell2 };
  }

  const rows = [
    createData("Username", user?.username),
    createData("User ID", user?.id),
    createData("Groups", user?.groups?.map((group) => group.name).join(", ")),
    createData(
      "Privilege",
      user?.groups
        ?.map((group) => group?.privileges?.map((privilege) => privilege.name))
        .join(", ")
    ),
    createData("Phone Number", user?.phoneNumber),
    createData(
      "MFA Key",
      user?.mfaKey ? (
        <>
          {user?.mfaKey}{" "}
          <IconButton
            onClick={() => {
              setSelectedMfaKey(user?.mfaKey);
            }}
          >
            <QrCode2Icon />
          </IconButton>
        </>
      ) : (
        "/"
      )
    ),
    createData("MFA Enabled", user?.mfaEnabled ? "YES" : "NO"),
    createData("Email", user?.email),
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
        User Details
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            item
            xs={8}
            md={11}
            style={{
              fontWeight: "bold",
              lineHeight: 3.6,
              fontSize: "x-large",
              fontFamily: "Helvetica, sans-serif",
              color: "#1F393C",
            }}
          >
            {" "}
            {user?.firstName} {user?.lastName}
          </Grid>
          <Grid>
            <Table>
              <TableBody>
                <Hidden smDown>
                  {rows.map((row) => (
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                      key={row.tableCell1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell width="550px" align="right">
                        {row.tableCell1}
                      </TableCell>
                      <TableCell align="left">{row.tableCell2}</TableCell>
                    </TableRow>
                  ))}
                </Hidden>
                <Hidden smUp>
                  {rows.map((row) => (
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                      key={row.tableCell1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        {row.tableCell1}: <br />
                        {row.tableCell2}
                      </TableCell>
                    </TableRow>
                  ))}
                </Hidden>
              </TableBody>
            </Table>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  style={{
                    color: "#17202A",
                    borderColor: "#17202A",
                    marginRight: "10px",
                  }}
                  size="medium"
                  fullWidth
                >
                  Delete user
                </Button>
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
                        setRedirectTo(`/users/delete/${id}`);
                      }}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#17202A",
                    color: "#D9D9D9",
                    borderColor: "#17202A",
                  }}
                  size="medium"
                  fullWidth
                  onClick={() => {
                    setRedirectTo(`/users/edit/${id}`);
                  }}
                >
                  <strong>Update User</strong>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={selectedMfaKey} onClose={() => setSelectedMfaKey()}>
        <DialogContent>
          <QRCode
            value={`otpauth://totp/${user?.username}?secret=${selectedMfaKey}&issuer=AuctaDev`}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
