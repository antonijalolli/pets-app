import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PetsRepository } from "./PetsRepository";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const DeletePet = ({}) => {
  const { id } = useParams();
  const [redirectTo, setRedirectTo] = useState();
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    deleteThisPet(id);
  }, []);

  const deleteThisPet = (id) => {
    PetsRepository.deletePet(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      {!deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The pet was successfully deleted!</h2>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#D35400", marginBottom: "20px" }}
          />
          <Grid xs={12}>
            <Button
              variant="outlined"
              size="large"
              style={{
                backgroundColor: "#17202A",
                color: "#D9D9D9",
                borderColor: "#17202A",
              }}
              fullWidth
              onClick={() => {
                setRedirectTo(`/pets`);
              }}
            >
              Back to Pets
            </Button>
          </Grid>
        </Container>
      )}
      {deleteError && (
        <Container maxWidth="xs" style={{ textAlign: "center" }}>
          <h2>The pet can not be deleted!</h2>
          <ErrorOutlineIcon
            sx={{ fontSize: 40 }}
            style={{ color: "#D35400", marginBottom: "20px" }}
          />
          <Grid xs={12}>
            <Button
              variant="outlined"
              size="large"
              style={{
                backgroundColor: "#17202A",
                color: "#D9D9D9",
                borderColor: "#17202A",
              }}
              fullWidth
              onClick={() => {
                setRedirectTo(`/pets`);
              }}
            >
              Back to Pets
            </Button>
          </Grid>
        </Container>
      )}
    </>
  );
};
