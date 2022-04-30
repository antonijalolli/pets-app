import {
  Container,
  Divider,
  Grid,
  Hidden,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Typography,
  Tooltip,
  Fade,
  ImageListItemBar,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import img1 from "../images/image.jpg";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { PetsRepository } from "./PetsRepository";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthService } from "../auth/AuthService";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { SETTINGS } from "../common/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const PetDetails = () => {
  const [pet, setPet] = useState();
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedPet, setSelectedPet] = useState();
  const [openSlider, setOpenSlider] = useState();
  const [selectedPicture, setSelectedPicture] = useState();
  const handleOpenSlider = (index) => {
    setOpenSlider(true);
    setSelectedPicture(index);
  };
  const handleCloseSlider = () => setOpenSlider(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    PetsRepository.get(id)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Container style={{ marginTop: "50px" }}>
        <Hidden smDown>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              style={{
                fontFamily: "Lucida Console, monospace",
                fontSize: "16px",
              }}
            >
              <Link
                underline="hover"
                color="inherit"
                to="/"
                style={{ textDecoration: "none", color: "#878786" }}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                to="/pets"
                style={{ textDecoration: "none", color: "#878786" }}
              >
                Pets
              </Link>
              <Link
                underline="hover"
                to={`/pets/details/${pet?.id}`}
                aria-current="page"
                style={{ textDecoration: "none", color: "#D35400" }}
              >
                {pet?.name}
              </Link>
            </Breadcrumbs>
          </div>
          <Divider></Divider>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} style={{ marginTop: "15px" }}>
              <ImageList
                style={{
                  width: "100%",
                  // height: "450px",
                  // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                  transform: "translateZ(0)",
                }}
                variant="quilted"
                rowHeight={200}
                gap={3}
                className="inner-border"
              >
                {pet && pet.pictures && pet.pictures.length > 0 ? (
                  pet.pictures.map((picture, index) => {
                    const cols = index == 0 ? 2 : 1;
                    const rows = index == 0 ? 2 : 1;

                    return (
                      <Tooltip
                        title="Click to open image"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        placement="bottom-end"
                      >
                        <ImageListItem
                          onClick={() => handleOpenSlider(index)}
                          key={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`}
                          cols={cols}
                          rows={rows}
                        >
                          <ImageListItemBar
                            sx={{
                              height: "30px",
                              background: "black",
                              opacity: "25%",
                              fontFamily: "Monaco, monospace",
                              fontSize: "12px",
                            }}
                            title={picture.type}
                          />
                          <img
                            {...srcset(
                              `${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`,
                              200,
                              250,
                              rows,
                              cols
                            )}
                            style={{ cursor: "pointer" }}
                            loading="lazy"
                            alt={picture.name}
                          />
                        </ImageListItem>
                      </Tooltip>
                    );
                  })
                ) : (
                  <img
                    src={img1}
                    style={{
                      width: "100%",
                      padding: "30%",
                    }}
                  />
                )}
              </ImageList>
            </Grid>
            <Grid item md={7} xs={12}>
              <Grid
                item
                xs={12}
                md={12}
                sm={5}
                style={{
                  textAlign: "center",
                  fontFamily: "Monaco, monospace",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: "35px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  {pet?.name}
                </div>
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <Grid item xs={12} md={12} style={{ marginTop: "-30px" }}>
                      <Button
                        style={{
                          color: "#1E1F1C",
                          float: "right",
                          marginLeft: "-25px",
                        }}
                        onClick={() => handleClickOpen(pet)}
                      >
                        <DeleteIcon
                          size="large"
                          style={{
                            color: "#FF6000",
                          }}
                        />
                      </Button>

                      <Button
                        style={{
                          color: "#1E1F1C",
                          float: "right",
                        }}
                        onClick={() => {
                          setRedirectTo(`/pets/edit/${pet?.id}`);
                        }}
                      >
                        <EditIcon
                          size="large"
                          style={{
                            color: "#202020",
                          }}
                        />
                      </Button>
                    </Grid>
                  )}
                <Divider
                  style={{
                    marginTop: "5px",
                    width: "640px",
                  }}
                ></Divider>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  marginTop: "15px",
                }}
              >
                <div style={{ textAlign: "left" }}>{pet?.description}</div>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  textAlign: "center",
                  fontSize: "16px",

                  marginTop: "40px",
                }}
              >
                <Table size="small">
                  <TableRow style={{ backgroundColor: "#8080801f" }}>
                    <TableCell>Pet ID:</TableCell>
                    <TableCell>
                      <b>{pet?.id}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country of origin:</TableCell>
                    <TableCell>
                      <b>{pet?.country?.name}</b>
                    </TableCell>
                  </TableRow>

                  {pet?.attributes?.map((attribute, index) => (
                    <TableRow
                      style={{
                        backgroundColor: index % 2 ? "#8080801f" : "inherit",
                      }}
                    >
                      <TableCell>{attribute.attributeType.name}:</TableCell>
                      <TableCell>
                        <b>{attribute.value}</b>
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        {/* MOBILE */}
        <Hidden smUp>
          <Grid item xs={12}>
            <ArrowBackIcon
              style={{
                color: "#D35400",
                marginTop: "-45px",
                marginBottom: "30px",
                marginLeft: "-10px",
              }}
              onClick={() => {
                setRedirectTo(`/pets`);
              }}
            />
          </Grid>
          <Grid item xs={12} md={5} style={{ marginTop: "15px" }}>
            <ImageList
              style={{
                width: "100%",
                height: "400px",
                transform: "translateZ(0)",
              }}
              rowHeight={200}
              gap={1}
            >
              {pet &&
                pet.pictures &&
                pet.pictures.map((picture, index) => {
                  const cols = index == 0 ? 2 : 1;
                  const rows = index == 0 ? 2 : 1;

                  return (
                    <ImageListItem
                      key={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`}
                      cols={cols}
                      rows={rows}
                    >
                      <img
                        {...srcset(
                          `${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`,
                          200,
                          250,
                          rows,
                          cols
                        )}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenSlider(index)}
                        loading="lazy"
                        alt={picture.name}
                      />
                    </ImageListItem>
                  );
                })}
            </ImageList>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              {pet?.name}
            </div>
            <Grid
              style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "-15px",
              }}
            >
              <Button
                style={{
                  color: "#1E1F1C",
                }}
              >
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <DeleteIcon
                      size="medium"
                      style={{
                        color: "#FF6000",
                        marginRight: "-32px",
                      }}
                      onClick={() => handleClickOpen(pet)}
                    />
                  )}
              </Button>

              <Button
                style={{
                  color: "#1E1F1C",
                }}
              >
                {window?.localStorage?.getItem("auth") &&
                  AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                    <Button
                      style={{
                        color: "#1E1F1C",
                        float: "right",
                      }}
                      onClick={() => {
                        setRedirectTo(`/pets/edit/${pet?.id}`);
                      }}
                    >
                      <EditIcon
                        size="large"
                        style={{
                          color: "#202020",
                        }}
                      />
                    </Button>
                  )}
              </Button>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }}></Divider>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
              display: "block",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginTop: "10px",
              color: "#878786",
            }}
          >
            <div style={{}}>{pet?.description}</div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "left",
              fontFamily: "Monaco, monospace",
              fontSize: "16px",
              marginTop: "40px",
              color: "#878786",
            }}
          >
            <div>
              Pet ID: <b>{pet?.id}</b>
              <br />
              Country of origin: <b>{pet?.country?.name}</b>
              <br />
              {pet?.attributes?.map((attribute) => (
                <span>
                  {attribute.attributeType.name}: <b>{attribute.value}</b>
                  <br />
                </span>
              ))}
            </div>
          </Grid>
          <Modal open={openSlider} selectedPicture={selectedPicture}>
            <Box
              style={{
                padding: "5%",
                marginTop: "50px",
              }}
            >
              <Typography style={{ textAlign: "center" }}>
                <IconButton onClick={handleCloseSlider}>
                  <CloseIcon style={{ color: "white" }}></CloseIcon>
                </IconButton>
              </Typography>
              <Carousel
                centerMode={false}
                dynamicHeight={true}
                infiniteLoop={true}
                showThumbs={false}
                useKeyboardArrows={true}
                selectedItem={selectedPicture}
              >
                {pet &&
                  pet.pictures &&
                  pet.pictures.map((picture, index) => (
                    <div style={{}}>
                      <img
                        src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture?.id}`}
                        key={index}
                        style={{
                          height: "auto",
                          width: "100%",
                        }}
                      ></img>
                    </div>
                  ))}
              </Carousel>{" "}
            </Box>
          </Modal>
        </Hidden>
      </Container>

      <Hidden smDown>
        <Modal open={openSlider} selectedPicture={selectedPicture}>
          <Box style={{ padding: "5%" }}>
            <Typography style={{ textAlign: "center" }}>
              <IconButton onClick={handleCloseSlider}>
                <CloseIcon style={{ color: "white" }}></CloseIcon>
              </IconButton>
            </Typography>
            <Carousel
              emulateTouch={true}
              swipeable={true}
              width="100%"
              dynamicHeight={false}
              infiniteLoop={true}
              showThumbs={false}
              useKeyboardArrows={true}
              selectedItem={selectedPicture}
            >
              {pet &&
                pet.pictures &&
                pet.pictures.map((picture, index) => (
                  <div style={{ height: "450px" }}>
                    <img
                      src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture?.id}`}
                      key={index}
                      style={{
                        height: "450px",
                        width: "auto",
                      }}
                    />
                  </div>
                ))}
            </Carousel>
          </Box>
        </Modal>
      </Hidden>
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
              setRedirectTo(`/pets/delete/${selectedPet?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
