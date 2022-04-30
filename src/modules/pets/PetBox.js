import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  Hidden,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AuthService } from "../auth/AuthService";
import { SETTINGS } from "../common/Settings";
import img1 from "../images/image.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PetBox = ({ pet }) => {
  const [redirectTo, setRedirectTo] = useState();
  const [selectedPet, setSelectedPet] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid item xs={12} md={3} sm={4}>
        <Card
          style={{
            border: "5px solid white",
            borderRadius: "10px",
            height: "400px",
          }}
        >
          <Link
            to={`/pets/details/${pet.id}`}
            style={{ textDecoration: "none", color: "#1E1F1C" }}
          >
            {pet &&
            pet.pictures &&
            pet.pictures.filter((g) => g.type === "PET").length > 0 &&
            pet.pictures.filter((g) => g.type === "PET")[0] ? (
              <CardMedia
                style={{ height: "270px" }}
                component="img"
                alt={pet.pictures.filter((g) => g.type === "PET")[0].name}
                // height="140"
                src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${
                  pet.pictures.filter((g) => g.type === "PET")[0].id
                }`}
              />
            ) : (
              <>
                <CardMedia
                  style={{ height: "270px" }}
                  component="img"
                  src={img1}
                />
              </>
            )}
          </Link>
          <Link
            to={`/pets/details/${pet.id}`}
            style={{ textDecoration: "none", color: "#1E1F1C" }}
          >
            <CardContent style={{ height: "50px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontFamily: "Monaco, monospace",
                  fontSize: "17px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {pet?.name}
              </Typography>
            </CardContent>
          </Link>

          <Hidden smDown>
            <CardActions style={{ float: "right" }}>
              <Button size="small" style={{ color: "#1E1F1C" }}>
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <DeleteIcon
                      style={{
                        color: "#FF6000",
                        marginRight: "145px",
                      }}
                      onClick={() => handleClickOpen(pet)}
                    />
                  )}
              </Button>

              <Button
                size="small"
                style={{
                  color: "#1E1F1C",
                  fontSize: 20,
                }}
                onClick={() => {
                  setRedirectTo(`/pets/details/${pet.id}`);
                }}
              >
                <Tooltip
                  title="More details"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  placement="bottom"
                >
                  <InfoOutlinedIcon
                    style={{
                      color: "#FF6000",
                      marginRight: "-30px",
                    }}
                  />
                </Tooltip>
              </Button>
            </CardActions>
          </Hidden>
          <Hidden smUp>
            <CardActions>
              <Grid container>
                <Grid item md={12}>
                  <Button
                    size="small"
                    style={{ color: "#1E1F1C", justifyContent: "start" }}
                  >
                    {window?.localStorage?.getItem("auth") &&
                      AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                        <DeleteIcon
                          style={{
                            color: "#FF6000",
                          }}
                          onClick={() => handleClickOpen(pet)}
                        />
                      )}
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item md={12}></Grid>
              </Grid>
              <Button
                size="small"
                float="right"
                style={{
                  color: "#1E1F1C",
                }}
                onClick={() => {
                  setRedirectTo(`/pets/details/${pet.id}`);
                }}
              >
                <InfoOutlinedIcon
                  style={{
                    color: "#FF6000",
                    marginRight: "-40px",
                  }}
                />
              </Button>
            </CardActions>
          </Hidden>
        </Card>
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
          Are you sure you want to delete this pet? This action
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
              setRedirectTo(`/pets/delete/${selectedPet.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
