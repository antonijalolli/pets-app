import {
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React from "react";
import { TextField, Alert } from "@mui/material";

export const UserForm = ({
  formError,
  formFieldErrors,
  user,
  handleChangeUserData,
  updateMode,
}) => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        {formError && (
          <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <Alert severity="error">{formError?.response?.data?.message}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="First name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            fullWidth
            value={user?.firstName ? user?.firstName : ""}
            onChange={(e) => handleChangeUserData("firstName", e.target.value)}
            error={formFieldErrors?.firstName}
            helperText={formFieldErrors?.firstName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Last name"
            size="small"
            variant="outlined"
            color="warning"
            fullWidth
            style={{ marginTop: "10px" }}
            value={user?.lastName ? user?.lastName : ""}
            onChange={(e) => handleChangeUserData("lastName", e.target.value)}
            error={formFieldErrors?.lastName}
            helperText={formFieldErrors?.lastName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            size="small"
            variant="outlined"
            color="warning"
            fullWidth
            style={{ marginTop: "10px" }}
            value={user?.phoneNumber ? user?.phoneNumber : ""}
            onChange={(e) =>
              handleChangeUserData("phoneNumber", e.target.value)
            }
            error={formFieldErrors?.phoneNumber}
            helperText={formFieldErrors?.phoneNumber}
          />
        </Grid>

        {!updateMode && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Email"
                size="small"
                variant="outlined"
                color="warning"
                fullWidth
                type="email"
                style={{ marginTop: "10px" }}
                value={user?.email ? user?.email : ""}
                onChange={(e) => handleChangeUserData("email", e.target.value)}
                error={formFieldErrors?.email}
                helperText={formFieldErrors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                size="small"
                variant="outlined"
                color="warning"
                fullWidth
                style={{ marginTop: "10px" }}
                value={user?.username ? user?.username : ""}
                onChange={(e) =>
                  handleChangeUserData("username", e.target.value)
                }
                error={formFieldErrors?.username}
                helperText={formFieldErrors?.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                size="small"
                variant="outlined"
                color="warning"
                type="password"
                style={{ marginTop: "10px" }}
                fullWidth
                value={user?.newPassword ? user?.newPassword : ""}
                onChange={(e) =>
                  handleChangeUserData("newPassword", e.target.value)
                }
                error={formFieldErrors?.newPassword}
                helperText={formFieldErrors?.newPassword}
              />
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};
