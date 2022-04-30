import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";

export const GroupForm = ({
  formError,
  formFieldErrors,
  group,
  handleChangeGroupData,
}) => {
  return (
    <>
      <Grid container spacing={2} style={{ marginLeft: "10px" }}>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {formError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  {formError?.response?.data?.error}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Group Name"
                size="small"
                variant="outlined"
                color="warning"
                autoFocus
                fullWidth
                value={group?.name ? group?.name : ""}
                onChange={(e) => handleChangeGroupData("name", e.target.value)}
                error={formFieldErrors?.name}
                helperText={formFieldErrors?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Group Code"
                size="small"
                variant="outlined"
                color="warning"
                fullWidth
                value={group?.code ? group?.code : ""}
                onChange={(e) => handleChangeGroupData("code", e.target.value)}
                error={formFieldErrors?.code}
                helperText={formFieldErrors?.code}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
