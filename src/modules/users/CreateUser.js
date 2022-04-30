import {
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { UserForm } from "./UserForm";
import { CreateUserValidator } from "./UserValidator";
import { GroupsRepository } from "../groups/GroupsRepository";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import { AuthService } from "../auth/AuthService";

export const CreateUser = (props) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [groups, setGroups] = useState();
  const [checked, setChecked] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const loadData = (page, size) => {
    GroupsRepository.getAll(page, size)
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  };
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    groups: [],
    privileges: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let valid = CreateUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
        console.log(err.inner);
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = {};
          validationErrors[validationError.path] = validationError.message;
        });
        console.log(validationErrors);
        setFormFieldErrors(validationErrors);
        return;
      });
      return;
    }

    setLoading(true);
    setGlobalFormError(null);
    setSuccessMessage(null);
    UsersRepository.create(user)
      .then((res) => {
        console.log(res);
        setSuccessMessage("User is created successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
        setLoading(false);
      });
  };

  const handleChangeUserData = (name, value) => {
    let data = { ...user };
    data[name] = value;
    setUser(data);
    console.log(data);
  };

  const handleChangeGroups = (group, event) => {
    let currentCheckedList = [...checked];
    if (currentCheckedList.includes(group)) {
      //remove
      const index = currentCheckedList.indexOf(group);
      if (index > -1) {
        currentCheckedList.splice(index, 1);
      }
    } else {
      //add
      currentCheckedList.push(group);
    }
    console.log(currentCheckedList);
    setChecked(currentCheckedList);
    handleChangeUserData("groups", currentCheckedList);
  };

  return (
    <>
      {successMessage && (
        <>
          <Container
            maxWidth="xs"
            style={{ marginTop: "20px", marginBottom: "-30px" }}
          >
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          </Container>
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
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ fontFamily: "Copperplate, fantasy" }}
        >
          Create New User
        </Typography>
      </Box>

      <Grid container spacing={2} style={{ marginTop: "40px" }}>
        {loading && (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress
              style={{ color: "#D35400", textAlign: "center" }}
            />
          </Grid>
        )}
        {!loading && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <UserForm
                  formError={globalFormError}
                  formFieldErrors={formFieldErrors}
                  handleSubmit={handleSubmit}
                  handleChangeUserData={handleChangeUserData}
                  user={user}
                />
              </Grid>
            </Grid>
            <Container maxWidth="xs" style={{ marginTop: "10px" }}>
              {groups?.content?.map((group) => (
                <FormGroup
                  style={{
                    display: "inline-block",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#D35400" }}
                        checked={checked.includes(group) ? true : false}
                        onChange={(e) => handleChangeGroups(group, e)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={group.name}
                  />
                </FormGroup>
              ))}
            </Container>

            <Grid item xs={12}></Grid>
            <Container maxWidth="xs" style={{ marginTop: "10px" }}>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                style={{ backgroundColor: "#17202A " }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Create
              </Button>
            </Container>
            <Grid item xs={12}></Grid>
          </>
        )}
      </Grid>
    </>
  );
};
