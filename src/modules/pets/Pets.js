import {
  Button,
  Container,
  Divider,
  Grid,
  Hidden,
  Pagination,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PetsRepository } from "./PetsRepository";
import { PetBox } from "./PetBox";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CountriesRepository } from "../countries/CountriesRepository";
import img1 from "../images/petsimage.jpg";

export const Pets = () => {
  const [pets, setPets] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [countries, setCountries] = useState();
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  useEffect(() => {
    loadData(0, 8);
  }, [searchParams]);

  const handleChangeSearchParams = (key, value) => {
    let data = { ...searchParams };
    data[key] = value;
    setSearchParams(data);
  };

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size, searchParams)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData(0, 8);
  }, []);

  const loadData = (page, size) => {
    let filterParams = { ...searchParams };
    if (filterParams.country) {
      filterParams["country.id"] = filterParams.country.id;
      delete filterParams.country;
    }

    PetsRepository.all(page, size, filterParams)
      .then((res) => {
        setPets(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 8);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid
        container
        style={{
          backgroundColor: "#0B648A",
          backgroundImage: `url(${img1}`,
          height: "200px",
        }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Hidden mdUp>
            <Grid item xs={12} md={6}>
              {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
                <Button
                  style={{
                    color: "white",
                    float: "right",
                    marginRight: "-10px",
                    marginTop: "-10px",
                  }}
                  onClick={() => {
                    setRedirectTo(`/pets/create`);
                  }}
                >
                  <AddIcon
                    fullWidth
                    variant="contained"
                    style={{
                      float: "right",
                      backgroundColor: "#D35400",
                      marginRight: "10px",
                      marginTop: "55px",
                    }}
                  ></AddIcon>
                </Button>
              )}
            </Grid>
          </Hidden>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              marginTop: "170px",
              textAlign: "center",
            }}
          >
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "white",
                  borderColor: "#D35400",
                  backgroundColor: "#D35400",
                  marginTop: "20px",
                }}
                onClick={() => {
                  setRedirectTo(`/pets/create`);
                }}
              >
                ADD NEW PET
              </Button>
            )}
          </Grid>
        </Hidden>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#f1f2f6",
          }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "#0B648A",
                    display: "block",
                    paddingTop: "50px",
                    textTransform: "uppercase",
                  }}
                >
                  Pets
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: "left", marginTop: "30px" }}
              >
                <span
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0B648A",
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: ".05rem",
                    marginLeft: "7px",
                    marginBottom: "6px",
                  }}
                >
                  search
                </span>

                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      placeholder="Search by name"
                      color="warning"
                      size="small"
                      value={searchParams?.name ? searchParams?.name : ""}
                      onChange={(e) => {
                        handleChangeSearchParams("name", e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Search by description"
                      size="small"
                      color="warning"
                      value={
                        searchParams?.description
                          ? searchParams?.description
                          : ""
                      }
                      onChange={(e) => {
                        handleChangeSearchParams("description", e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item md={4} xs={12} style={{ textAlign: "left" }}>
                    <FormControl fullWidth size="small" color="warning">
                      <InputLabel htmlFor="grouped-native-select">
                        Country
                      </InputLabel>
                      <Select
                        onChange={(e) => {
                          handleChangeSearchParams("country", e.target.value);
                        }}
                        id="grouped-native-select"
                        label="Country"
                      >
                        <MenuItem>{""}</MenuItem>
                        {countries?.content?.map((country) => (
                          <MenuItem value={country}> {country.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ marginBottom: "20px", textAlign: "left" }}
                  >
                    <TextField
                      fullWidth
                      label="Attributes"
                      placeholder="Search by attributes"
                      size="small"
                      color="warning"
                      value={
                        searchParams?.searchByAttributes
                          ? searchParams?.searchByAttributes
                          : ""
                      }
                      style={{ marginTop: "-15px" }}
                      onChange={(e) => {
                        handleChangeSearchParams(
                          "searchByAttributes",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {pets?.content?.map((pet, index) => (
            <PetBox pet={pet} />
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item={12} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {pets && pets.number !== undefined && (
            <Stack spacing={2} style={{ marginTop: "20px" }}>
              <Pagination
                color="warning"
                count={Math.floor(pets?.totalElements / pets?.size) + 1}
                showFirstButton
                showLastButton
                style={{
                  color: "#D35400",
                }}
                page={pets.number + 1}
                onChange={handleChange}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
};
