import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Table,
  TableCell,
  TableRow,
  TextField,
  DialogActions,
  Modal,
  Tooltip,
  Hidden,
  Divider,
  Breadcrumbs,
  NativeSelect,
} from "@mui/material";
import { Box } from "@mui/system";
import Lightbox from "react-image-lightbox";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PetsRepository } from "./PetsRepository";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CountriesRepository } from "../countries/CountriesRepository";
import EditIcon from "@mui/icons-material/Edit";
import { UpdatePetValidator } from "./PetValidator";
import { Upload } from "../common/Upload";
import { SETTINGS } from "../common/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { AttributeTypeRepository } from "../attributeTypes/AttributeTypeRepository";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styleChild = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  // p: 1,
};
export const UpdatePet = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const [countries, setCountries] = useState();
  const [attachments, setAttachments] = useState([]);
  const [picturesDialogOpen, setPicturesDialogOpen] = useState(false);
  const [attributesDialogOpen, setAttributesDialogOpen] = useState(false);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [deletePictureDialogOpen, setDeletePictureDialogOpen] = useState();
  const [selectedPicture, setSelectedPicture] = useState();
  const [successUploadPicture, setSuccessUploadPicture] = useState();
  const [pictureTypes, setPictureTypes] = useState();
  const [pictureType, setPictureType] = useState();
  const [uploadError, setUploadError] = useState();
  const [openPictureType, setOpenPictureType] = useState();
  const [successUpdatePicture, setSuccessUpdatePicture] = useState();
  const [updateError, setUpdateError] = useState();

  const handleOpenPictureType = (picture) => {
    setOpenPictureType(true);
    setSelectedPicture(picture);
  };
  const handleClosePictureType = () => {
    setOpenPictureType(false);
  };

  const [openPicture, setOpenPicture] = React.useState(false);
  const handleOpenPicture = (picture) => {
    setOpenPicture(true);
    setSelectedPicture(picture);
  };
  const handleClosePicture = () => {
    setSelectedPicture(null);
    setOpenPicture(false);
  };

  useEffect(() => {
    loadDataAttrubuteType(0, 1000);
  }, []);

  useEffect(
    () => {
      loadById(id);
    },
    [attributeTypes],
    [pictureTypes],
    [attachments],
    [pictureType]
  );

  useEffect(() => {
    loadPictureTypes();
  }, []);

  const loadPictureTypes = () => {
    PetsRepository.pictureTypes()
      .then((res) => {
        console.log("picture types");
        console.log(res.data);
        setPictureTypes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (attributesDialogOpen) => {
    setAttributesDialogOpen(attributesDialogOpen);
    setOpen(true);
  };

  const handleClickClose = (attributestDialogOpen) => {
    setAttributesDialogOpen(attributesDialogOpen);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (picture) => {
    PetsRepository.removePicture(id, picture)
      .then((res) => {
        loadById(id);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpenDeletePicture = (pet) => {
    setDeletePictureDialogOpen(pet);
    setOpen(true);
  };

  const loadDataAttrubuteType = (page, size) => {
    AttributeTypeRepository.all(page, size)
      .then((res) => {
        setAttributeTypes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatePictureType = () => {
    setSuccessUpdatePicture(null);
    PetsRepository.updatePictureType(
      id,
      selectedPicture.id,
      selectedPicture.type
    )
      .then((res) => {
        console.log(res);
        console.log(selectedPicture);
        setSuccessUpdatePicture("Picture Type is changed");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpload = () => {
    if (attachments && attachments.length > 0) {
      let data = new FormData();
      Object.keys(attachments).forEach((key) =>
        data.append("files", attachments[key])
      );
      setUploadError(null);
      setSuccessUploadPicture();
      PetsRepository.uploadPictures(id, pictureType, attachments)
        .then((res) => {
          console.log(res.data);
          setAttachments([]);
          loadById(id);
          setSuccessUploadPicture("Pictures uploaded successfully");

          console.log(pictureType);
        })
        .catch((err) => {
          console.log(err);
          setUploadError(err);
        });
    }
  };
  const updateType = () => {
    setUpdateError(null);

    PetsRepository.updatePictureType(id, selectedPicture.id, pictureType)
      .then((res) => {
        console.log(res.data);
        loadById(id);
        console.log(pictureType);
        console.log("passed");
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(err);
        console.log("didn't pass");
      });
  };

  const loadById = (id) => {
    PetsRepository.get(id)
      .then((res) => {
        setPet(res.data);
        let values = [];
        attributeTypes?.content?.forEach((key, index) => {
          console.log(res.data?.attributes);
          values[key.id + "_"] = res.data?.attributes[index]?.value;
        });
        setAttributeValues(values);
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    let attributes = [];
    for (var key in attributeValues) {
      attributes.push({
        attributeType: {
          id: key.substring(0, key.length - 1),
        },
        value: attributeValues[key],
      });
    }
    console.log(attributes);
    let formData = { ...pet };
    formData.attributes = attributes;
    let valid = UpdatePetValidator.isValidSync(formData);
    setGlobalFormError(null);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdatePetValidator.validate(pet, { abortEarly: false }).catch((err) => {
        console.log(err.inner);
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = {};
          validationErrors[validationError.path] = validationError.message;
        });
        console.log(validationErrors);
        setFormFieldErrors(validationErrors);
        setGlobalFormError(err);
        return;
      });
      return;
    }
    setGlobalFormError(null);
    setSuccessMessage(null);
    PetsRepository.updatePet(formData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Pet is updated successfully");
        console.log("pet updated");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeAttributeValue = (key, value) => {
    let data = { ...attributeValues };
    data[key] = value;
    setAttributeValues(data);
    console.log(data);
  };
  const handleChangePetData = (name, value) => {
    let data = { ...pet };
    data[name] = value;
    setPet(data);
    console.log(data);
  };

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeCountry = (e) => {
    console.log(e.target.value);
    handleChangePetData(
      "country",
      countries.content.filter((c) => c.id === e.target.value)[0]
    );
  };

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      {successMessage && (
        <>
          <Container style={{ marginTop: "20px", marginBottom: "-30px" }}>
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          </Container>
        </>
      )}
      {globalFormError && (
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Alert severity="error">
            {globalFormError?.response?.data?.message}
          </Alert>
        </Grid>
      )}

      <Hidden smDown>
        <Container style={{ marginTop: "50px" }}>
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
                style={{
                  textDecoration: "none",
                  color: "#878786",
                  marginLeft: "-19px",
                }}
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
                style={{ textDecoration: "none", color: "#878786" }}
              >
                {pet?.name}
              </Link>
              <Link
                underline="hover"
                to={`/pets/edit/${pet?.id}`}
                aria-current="page"
                style={{ textDecoration: "none", color: "#D35400" }}
              >
                Edit
              </Link>
            </Breadcrumbs>
          </div>
        </Container>
        <Divider></Divider>
      </Hidden>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <EditIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            fontWeight: "bold",
            fontFamily: "Verdana, sans-serif",
            fontSize: "20px",
          }}
        >
          Edit Pet Info
        </Typography>
      </Box>
      <Container maxWidth="xs" style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            fullWidth
            value={pet?.name ? pet?.name : ""}
            onChange={(e) => handleChangePetData("name", e.target.value)}
            error={formFieldErrors?.name}
            helperText={formFieldErrors?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            size="small"
            variant="outlined"
            color="warning"
            multiline
            rows={4}
            fullWidth
            value={pet?.description ? pet?.description : ""}
            onChange={(e) => handleChangePetData("description", e.target.value)}
            error={formFieldErrors?.description}
            helperText={formFieldErrors?.description}
            style={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12}>
          {countries?.content && (
            <FormControl color="warning" fullWidth style={{ marginTop: "8px" }}>
              <InputLabel id="demo-country-select-label">Country</InputLabel>
              <Select
                label="Country"
                labelId="demo-country-select-label"
                id="demo-country-select"
                value={pet?.country?.id ? pet?.country?.id : ""}
                onChange={handleChangeCountry}
                error={formFieldErrors?.description}
                helperText={formFieldErrors?.description}
              >
                <MenuItem> / </MenuItem>
                {countries?.content.map((country) => (
                  <MenuItem value={country?.id}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0.5} style={{ marginTop: "10px" }}>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                variant="contained"
                fullWidth
                onClick={() => {
                  setPicturesDialogOpen(true);
                }}
                style={{
                  backgroundColor: "#D35400",
                  fontFamily: "Verdana, sans-serif",
                }}
              >
                Pictures
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => {
                  handleClickOpen(true);
                }}
                style={{
                  backgroundColor: "#D35400",
                  fontFamily: "Verdana, sans-serif",
                }}
              >
                Attributes
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{
                backgroundColor: "#17202A",
                marginTop: "8px",
                fontFamily: "Verdana, sans-serif",
              }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Hidden smDown>
        <Dialog maxWidth="md" fullWidth={true} open={picturesDialogOpen}>
          {uploadError && (
            <Grid item xs={12}>
              <Alert severity="error">
                {uploadError?.response?.data?.message}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12} style={{ backgroundColor: "black" }}>
            <DialogTitle
              style={{
                fontFamily: "Verdana, sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Upload pictures
              <IconButton
                size="small"
                style={{
                  float: "right",
                  color: "white",
                }}
                onClick={() => {
                  setPicturesDialogOpen(false);
                  setSuccessUploadPicture(null);
                  setSuccessUpdatePicture(null);
                }}
              >
                <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
              </IconButton>
            </DialogTitle>
          </Grid>
          {successUploadPicture && (
            <>
              <Grid style={{}}>
                <Alert
                  severity="success"
                  variant="filled"
                  style={{ borderRadius: "0px" }}
                >
                  {successUploadPicture}
                </Alert>
              </Grid>
            </>
          )}
          {successUpdatePicture && (
            <>
              <Grid style={{}}>
                <Alert
                  severity="success"
                  variant="filled"
                  style={{ borderRadius: "0px" }}
                >
                  {successUpdatePicture}
                </Alert>
              </Grid>
            </>
          )}

          <DialogContent>
            <Grid container spacing={2} style={{}}>
              <Grid item md={2.5}>
                <FormControl
                  fullWidth
                  size="small"
                  color="grey"
                  variant="outlined"
                >
                  <InputLabel>Picture Type</InputLabel>
                  <Select
                    sx={{
                      height: "39px",
                    }}
                    onChange={(e) => {
                      setPictureType(e.target.value);
                    }}
                  >
                    {pictureTypes &&
                      pictureTypes?.map((type) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={7.5}>
                <Upload
                  attachments={attachments}
                  setAttachments={setAttachments}
                />
              </Grid>

              <Grid item md={2}>
                <Button
                  color="success"
                  variant="contained"
                  size="large"
                  onClick={() => {
                    handleUpload();
                  }}
                  style={{
                    fontSize: "12px",
                    fontFamily: "Verdana, sans-serif",
                    width: "95px",
                    borderColor: "#2E7D32",
                  }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Table size="small">
                  {pet &&
                    pet.pictures &&
                    pet.pictures.map((picture, index) => (
                      <TableRow>
                        <TableCell style={{ width: "40px" }}>
                          <Tooltip title="Open Image" placement="right">
                            <IconButton
                              onClick={() => {
                                handleOpenPicture(picture);
                              }}
                            >
                              <img
                                height="35px"
                                key={picture}
                                alt={picture}
                                src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>

                        <TableCell
                          style={{
                            fontFamily: "Verdana, sans-serif",
                            marginLeft: "20px",
                          }}
                        >
                          {picture.name}
                        </TableCell>
                        <Tooltip title="Change picture type" placement="left">
                          <TableCell
                            style={{ width: "100px", cursor: "pointer" }}
                            onClick={() => {
                              handleOpenPictureType(picture);
                            }}
                          >
                            {picture.type}
                          </TableCell>
                        </Tooltip>
                        <TableCell style={{ width: "50px" }}>
                          <IconButton
                            onClick={(e) => {
                              handleDelete(picture);
                            }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </Table>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Modal
          open={openPicture}
          onClose={handleClosePicture}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {""}
            <img
              height={"100%"}
              width={"100%"}
              src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${selectedPicture?.id}`}
            />
          </Box>
        </Modal>
      </Hidden>

      <Hidden smUp>
        <Dialog maxWidth="sm" fullWidth={true} open={picturesDialogOpen}>
          {uploadError && (
            <Grid item xs={12}>
              <Alert severity="error">
                {uploadError?.response?.data?.message}
              </Alert>
            </Grid>
          )}
          {successUpdatePicture && (
            <Grid item xs={12}>
              <Alert severity="success">{successUpdatePicture}</Alert>
            </Grid>
          )}{" "}
          {successUploadPicture && (
            <Grid item xs={12}>
              <Alert severity="success">{successUploadPicture}</Alert>
            </Grid>
          )}
          <Grid item xs={12} style={{ background: "black" }}>
            <DialogTitle
              style={{
                fontWeight: "bold",
                fontFamily: "Verdana, sans-serif",
                fontSize: "14px",
                color: "white",
              }}
            >
              Upload pictures
              <IconButton
                size="small"
                style={{
                  color: "white",
                  float: "right",
                  marginTop: "-3px",
                }}
                onClick={() => {
                  setPicturesDialogOpen(false);
                  setSuccessUpdatePicture(null);
                  setSuccessUploadPicture(null);
                }}
              >
                <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
              </IconButton>
            </DialogTitle>
          </Grid>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  color="grey"
                  variant="outlined"
                >
                  <InputLabel>Picture Type</InputLabel>
                  <Select
                    onChange={(e) => {
                      setPictureType(e.target.value);
                    }}
                  >
                    {pictureTypes &&
                      pictureTypes?.map((type) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Upload
                  attachments={attachments}
                  setAttachments={setAttachments}
                ></Upload>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  size="large"
                  onClick={() => {
                    handleUpload();
                  }}
                  style={{
                    fontSize: "12px",
                    fontFamily: "Verdana, sans-serif",
                  }}
                >
                  Submit
                </Button>
              </Grid>
              <Divider></Divider>
              <Grid item xs={12}>
                <Table size="small">
                  {pet &&
                    pet.pictures &&
                    pet.pictures.map((picture, index) => (
                      <TableRow>
                        <TableCell style={{}}>
                          <IconButton
                            onClick={() => {
                              handleOpenPicture(picture);
                            }}
                          >
                            <img
                              height="30px"
                              width="40px"
                              key={picture}
                              alt={picture}
                              src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${picture.id}`}
                              style={{ marginLeft: "-20px" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              fontSize: "12px",
                              whiteSpace: "normal",
                              fontFamily: "Verdana, sans-serif",
                            }}
                          >
                            {picture.name}
                          </span>
                          <IconButton style={{ float: "right" }}>
                            <DeleteIcon
                              color="error"
                              onClick={(e) => {
                                handleDelete(picture);
                              }}
                            ></DeleteIcon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </Table>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Modal
          open={openPicture}
          onClose={handleClosePicture}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {""}
            <img
              height={"100%"}
              width={"100%"}
              src={`${SETTINGS.API_BASE_URL}pets/downloadPetImage/${selectedPicture?.id}`}
            />
          </Box>
        </Modal>
      </Hidden>

      <Hidden smDown>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid item xs={12} style={{ background: "black" }}>
            <DialogTitle
              style={{
                fontWeight: "bold",
                fontFamily: "Verdana, sans-serif",
                fontSize: "16px",
                color: "white",
              }}
            >
              Edit Attributes
              <IconButton
                size="small"
                style={{
                  color: "white",
                  float: "right",
                  marginRight: "-10px",
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
              </IconButton>
            </DialogTitle>
          </Grid>
          <EditIcon
            style={{
              color: "#F15E5E",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "50px",
              marginTop: "10px",
            }}
          />
          <DialogContent style={{ textAlign: "center", marginTop: "-20px" }}>
            <Container maxWidth="xs">
              {attributeValues &&
                attributeTypes?.content?.map((attributeType, index) => (
                  <Grid item xs={12}>
                    <TextField
                      label={attributeType.name}
                      size="small"
                      value={
                        attributeValues[attributeType?.id + "_"]
                          ? attributeValues[attributeType?.id + "_"]
                          : ""
                      }
                      onChange={(e) =>
                        handleChangeAttributeValue(
                          attributeType?.id + "_",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      color="warning"
                      fullWidth
                      style={{ marginTop: "8px" }}
                    ></TextField>
                  </Grid>
                ))}
              <Button
                onClick={handleClose}
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "#C1C1C1",
                  color: "white",
                  border: "#C1C1C1",
                  float: "right",
                  marginTop: "10px",
                  width: "20px",
                }}
              >
                done
              </Button>
            </Container>
          </DialogContent>
        </Dialog>
      </Hidden>

      <Hidden smUp>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid item xs={12} style={{ background: "black" }}>
            <DialogTitle
              style={{
                fontWeight: "bold",
                fontFamily: "Verdana, sans-serif",
                fontSize: "16px",
                color: "white",
              }}
            >
              Edit Attributes
              <IconButton
                size="small"
                style={{
                  color: "white",
                  marginTop: "1px",
                  float: "right",
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon style={{ fontSize: 20 }}></CloseIcon>
              </IconButton>
            </DialogTitle>
          </Grid>
          <EditIcon
            style={{
              color: "#F15E5E",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "50px",
              marginTop: "15px",
            }}
          />
          <DialogContent style={{ textAlign: "center", marginTop: "-20px" }}>
            <Container maxWidth="xs">
              {attributeValues &&
                attributeTypes?.content?.map((attributeType, index) => (
                  <Grid item xs={12}>
                    <TextField
                      label={attributeType.name}
                      size="small"
                      value={
                        attributeValues[attributeType?.id + "_"]
                          ? attributeValues[attributeType?.id + "_"]
                          : ""
                      }
                      onChange={(e) =>
                        handleChangeAttributeValue(
                          attributeType?.id + "_",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      color="warning"
                      fullWidth
                      style={{ marginTop: "8px" }}
                    ></TextField>
                  </Grid>
                ))}
              <Button
                onClick={() => {
                  handleClose();
                }}
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "#C1C1C1",
                  color: "white",
                  border: "#C1C1C1",
                  float: "right",
                  marginTop: "15px",
                }}
              >
                done
              </Button>
            </Container>
          </DialogContent>
        </Dialog>
      </Hidden>

      <Modal
        hideBackdrop
        open={openPictureType}
        onClose={handleClosePictureType}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...styleChild, width: 280 }}>
          <h2 id="child-modal-title">Change Picture Type</h2>
          <p id="child-modal-description">
            <FormControl fullWidth size="small" color="grey" variant="outlined">
              <InputLabel>Picture Type</InputLabel>
              <Select
                onChange={(e) => {
                  selectedPicture.type = e.target.value;
                }}
              >
                {pictureTypes &&
                  pictureTypes?.map((type) => (
                    <MenuItem value={type}>{type}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </p>
          <Button
            onClick={() => {
              handleUpdatePictureType();
              handleClosePictureType();
            }}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "#C1C1C1",
              color: "white",
              border: "#C1C1C1",
              float: "right",
              marginTop: "15px",
            }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </>
  );
};
