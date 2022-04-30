import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";

import { CreateGroupValidator } from "./GroupValidator";
import { GroupForm } from "./GroupForm";
import { GroupsRepository } from "./GroupsRepository";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PrivilegesRepository } from "../privileges/PrivilegesRepository";
import AddIcon from "@mui/icons-material/Add";

export const CreateGroup = (props) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [privileges, setPrivileges] = useState();
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  const loadData = (page, size) => {
    PrivilegesRepository.getAll(page, size)
      .then((res) => setPrivileges(res.data))
      .catch((err) => console.log(err));
  };
  const [group, setGroup] = useState({
    name: "",
    privileges: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let valid = CreateGroupValidator.isValidSync(group);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreateGroupValidator.validate(group, { abortEarly: false }).catch(
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

    setLoading(true);
    setGlobalFormError(null);
    setSuccessMessage(null);
    GroupsRepository.create(group)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Group is created successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
        setLoading(false);
      });
  };

  const handleChangeGroupData = (name, value) => {
    let data = { ...group };
    data[name] = value;
    setGroup(data);
    console.log(data);
  };

  const handleChangePrivileges = (privilege, event) => {
    let currentCheckedList = [...checked];
    if (currentCheckedList.includes(privilege)) {
      //remove
      const index = currentCheckedList.indexOf(privilege);
      if (index > -1) {
        currentCheckedList.splice(index, 1);
      }
    } else {
      //add
      currentCheckedList.push(privilege);
    }
    console.log(currentCheckedList);
    setChecked(currentCheckedList);
    handleChangeGroupData("privileges", currentCheckedList);
  };

  return (
    <>
      {successMessage && (
        <>
          <Grid style={{ marginTop: "20px", marginBottom: "-10px" }}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        </>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <AddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: "center",
            fontFamily: "Copperplate, fantasy",
          }}
        >
          Create New Group
        </Typography>
      </Box>
      <Grid container spacing={2} style={{ marginTop: "40px" }}>
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              marginTop: "150px",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {!loading && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <GroupForm
                  formError={globalFormError}
                  formFieldErrors={formFieldErrors}
                  handleSubmit={handleSubmit}
                  handleChangeGroupData={handleChangeGroupData}
                  group={group}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Hidden smDown={true}>
                  <Grid item md={10}></Grid>
                </Hidden>
                <Grid xs={12} md={12} style={{ textAlign: "center" }}>
                  {privileges?.content?.map((privilege) => (
                    <FormGroup
                      style={{
                        display: "inline-block",
                        marginLeft: "16px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: "#D35400" }}
                            checked={checked.includes(privilege) ? true : false}
                            onChange={(e) =>
                              handleChangePrivileges(privilege, e)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label={privilege.name}
                      />
                    </FormGroup>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Hidden smDown={true}>
                      <Grid item xs={4}></Grid>
                    </Hidden>
                    <Grid item xs={12} md={4}>
                      <Button
                        onClick={() => {
                          handleSubmit();
                        }}
                        fullWidth
                        size="large"
                        variant="outlined"
                        style={{
                          backgroundColor: "#17202A",
                          color: "#D9D9D9",
                          borderColor: "#17202A",
                        }}
                      >
                        Create group
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
