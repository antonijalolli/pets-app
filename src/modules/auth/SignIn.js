import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthService } from "./AuthService";
import { useNavigate } from "react-router";
import { Alert, Hidden } from "@mui/material";

const theme = createTheme();
export const SignIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mfaToken, setMfaToken] = React.useState("");
  const [mfaTokenRequired, setMfaTokenRequired] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState();
  let navigate = useNavigate();

  const handleSubmit = () => {
    console.log(username, password);
    setErrorMessage();
    AuthService.authenticate(username, password, mfaToken)
      .then((res) => {
        console.log(res.data);
        if (res.data.jwt) {
          AuthService.storeToken(res.data.jwt);
          navigate("/");
        } else {
          if (
            res.data.additionalActionRequired &&
            res.data.additionalActionRequired === "MFA_REQUIRED"
          ) {
            setMfaTokenRequired(true);
          } else if (
            res.data.additionalActionRequired &&
            res.data.additionalActionRequired === "MFA_TOKEN_INVALID"
          ) {
            setErrorMessage("MFA Token is invalid");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <>
      <Container maxWidth="xs">
        {errorMessage && (
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          </Grid>
        )}
      </Container>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              {!mfaTokenRequired && (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    id="username"
                    size="small"
                    color="warning"
                    label="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    fullWidth
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    label="Password"
                    color="warning"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    style={{ marginTop: "-1px" }}
                  />
                </>
              )}

              {mfaTokenRequired && (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                    id="mfaToken"
                    size="small"
                    color="warning"
                    label="OTP Password (e.g. Google Authenticator Code)"
                    value={mfaToken}
                    onChange={(e) => {
                      setMfaToken(e.target.value);
                    }}
                    autoFocus
                  />
                </>
              )}

              <Button
                onClick={() => handleSubmit()}
                type="submit"
                fullWidth
                style={{ backgroundColor: "#17202A" }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
