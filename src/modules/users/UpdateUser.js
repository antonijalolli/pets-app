import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { UserForm } from "./UserForm";
import { UsersRepository } from "./UsersRepository";
import { UpdateUserValidator } from "./UserValidator";
import { GroupsRepository } from "../groups/GroupsRepository";
import Box from "@mui/material/Box";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export const UpdateUser = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState();
  const [checked, setChecked] = useState([]);
  const [updateMode, setUpdateMode] = useState();
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  const loadData = (page, size) => {
    GroupsRepository.getAll(page, size)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadById(id);
  }, []);

  const loadById = (id) => {
    setLoading(true);
    UsersRepository.get(id)
      .then((res) => {
        setUser(res.data);
        setUpdateMode(true);
        setLoading(false);
        setChecked(res.data.groups);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    let valid = UpdateUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
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
    UsersRepository.updateUser(user?.id, user)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setSuccessMessage("User is updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setGlobalFormError(err);
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
    if (currentCheckedList.map((g) => g.id).includes(group.id)) {
      //remove
      const index = currentCheckedList.map((g) => g.id).indexOf(group.id);
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
            <Alert severity="success">{successMessage}</Alert>
          </Container>
        </>
      )}
      {redirectTo && <Navigate to={redirectTo} push />}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <PersonOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontWeight: "bold" }}>
          Edit User
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
                  updateMode={updateMode}
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
                        checked={
                          checked?.map((g) => g.id).includes(group.id)
                            ? true
                            : false
                        }
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
            <Container maxWidth="xs">
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                fullWidth
                style={{ backgroundColor: "#17202A " }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update user
              </Button>
            </Container>
            <Grid item xs={12}></Grid>
            <Container maxWidth="xs" style={{ marginTop: "-40px" }}>
              <Button
                onClick={() => {
                  setRedirectTo(`/users/details/${user?.id}`);
                }}
                type="submit"
                fullWidth
                style={{ backgroundColor: "#17202A " }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Back to user
              </Button>
            </Container>
            <Grid item xs={12}></Grid>
          </>
        )}
      </Grid>
    </>
  );
};
