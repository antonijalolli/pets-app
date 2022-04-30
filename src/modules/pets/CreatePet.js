import {
  Alert,
  Avatar,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { CreatePetValidator } from "./PetValidator";
import { PetsRepository } from "./PetsRepository";
import { AttributeTypeRepository } from "../attributeTypes/AttributeTypeRepository";
import { CountriesRepository } from "../countries/CountriesRepository";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

export const CreatePet = () => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [attributeValues, setAttributeValues] = useState();
  const [countries, setCountries] = useState();
  const [pet, setPet] = useState({
    name: "",
    description: "",
    attributes: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };

  const [attributeTypes, setAttributeTypes] = useState();

  useEffect(() => {
    loadDataAttrubuteType(0, 1000);
  }, []);

  const loadDataAttrubuteType = (page, size) => {
    AttributeTypeRepository.all(page, size)
      .then((res) => {
        let values = [];
        res.data.content.forEach((key) => {
          values[key.id + "_"] = null;
        });
        setAttributeValues(values);
        setAttributeTypes(res.data);
      })
      .catch((err) => console.log(err));
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
    let valid = CreatePetValidator.isValidSync(formData);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreatePetValidator.validate(formData, { abortEarly: false }).catch(
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

    setGlobalFormError(null);
    setSuccessMessage(null);
    PetsRepository.create(formData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Pet added!");
        console.log("pet added");
        navigate(`/pets/edit/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeCountry = (e) => {
    console.log(e.target.value);
    handleChangePetData("country", e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "#D35400" }}>
          <AddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", fontFamily: "Copperplate, fantasy" }}
        >
          Add new pet
        </Typography>
      </Box>

      <Container maxWidth="xs" style={{ float: "left" }}>
        <Grid item xs={12} style={{ marginTop: "40px" }}>
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
            placeholder="Description"
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
          <FormControl color="warning" fullWidth style={{ marginTop: "8px" }}>
            <InputLabel id="demo-country-select-label">Country</InputLabel>
            <Select
              label="Country"
              labelId="demo-country-select-label"
              id="demo-country-select"
              value={pet?.country}
              onChange={handleChangeCountry}
            >
              <MenuItem> / </MenuItem>
              {countries?.content.map((country) => (
                <MenuItem value={country}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Container>
      {/* ////////////////////////////////////MD/////////////////////////////////////// */}
      <Hidden mdDown>
        <Container style={{ float: "left", width: "700px" }}>
          <Grid style={{ marginTop: "33px" }}></Grid>
          {attributeTypes?.content?.map((attributeType) => (
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
              />
            </Grid>
          ))}

          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{ backgroundColor: "#17202A ", float: "right" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Grid>
        </Container>
      </Hidden>
      {/* ////////////////////////////////////MOBILE///////////////////////////////////////////////////////////////////// */}
      <Hidden mdUp>
        <Divider></Divider>
        <Container maxWidth="xs">
          {attributeTypes?.content?.map((attributeType) => (
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
              />
            </Grid>
          ))}
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{ backgroundColor: "#17202A ", float: "right" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Create
            </Button>
          </Grid>
        </Container>
      </Hidden>
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
        <>
          <Container style={{ marginTop: "20px", marginBottom: "-30px" }}>
            <Alert variant="filled" severity="error">
              {globalFormError?.response?.data?.message}
            </Alert>
          </Container>
        </>
      )}
    </>
  );
};
