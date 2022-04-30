import { Button, Container, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const ForbiddenAccess = () => {
  const [redirectTo, setRedirectTo] = useState();

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          style={{
            textAlign: "center",
            fontFamily: "Monaco, monospace",
            fontSize: "70px",
            color: "#93B5C6",
          }}
        >
          <h1>403</h1>
        </Grid>
        <Grid item xs={12} md={12}>
          <h1
            style={{
              color: "#17202A",
              fontSize: "40px",
              textAlign: "center",
              marginTop: "-60px",
              fontFamily: "Monaco, monospace",
            }}
          >
            We are sorry...
          </h1>
        </Grid>
        <Grid item xs={12} md={12}>
          <div
            type="text"
            style={{
              color: "#17202A",
              fontFamily: "Monaco, monospace",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            The page you're trying to access has restricted access. <br />
            Please refer to your system administrator.
          </div>
        </Grid>
      </Grid>
      <Container maxWidth="xs">
        <Button
          fullWidth
          variant="contained"
          size="small"
          style={{
            backgroundColor: "#D35400",
            marginTop: "20px",
          }}
          onClick={() => {
            setRedirectTo(`/`);
          }}
        >
          Back to home
        </Button>
      </Container>
    </>
  );
};
