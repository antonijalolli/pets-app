import { Alert, Button, CircularProgress, Grid, Hidden } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { UpdateGroupValidator } from "./GroupValidator";
import { GroupsRepository } from "./GroupsRepository";
import { GroupForm } from "./GroupForm";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PrivilegesRepository } from "../privileges/PrivilegesRepository";

export const UpdateGroup = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [group, setGroup] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [privileges, setPrivileges] = useState();
  const [checked, setChecked] = React.useState([]);
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  const loadData = (page, size) => {
    PrivilegesRepository.getAll(page, size)
      .then((res) => setPrivileges(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadById(id);
  }, []);
  const loadById = (id) => {
    setLoading(true);
    GroupsRepository.get(id)
      .then((res) => {
        setGroup(res.data);
        setLoading(false);
        setChecked(res.data.privileges);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    let valid = UpdateGroupValidator.isValidSync(group);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateGroupValidator.validate(group, { abortEarly: false }).catch(
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
    GroupsRepository.updateGroup(group?.id, group)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Group is updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
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
    if (currentCheckedList.map((p) => p.id).includes(privilege.id)) {
      //remove
      const index = currentCheckedList.map((p) => p.id).indexOf(privilege.id);
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
      {redirectTo && <Navigate to={redirectTo} push />}
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Update existing group
      </h1>

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
          <Grid container spacing={2} style={{ marginTop: "40px" }}>
            <GroupForm
              formError={globalFormError}
              formFieldErrors={formFieldErrors}
              handleSubmit={handleSubmit}
              handleChangeGroupData={handleChangeGroupData}
              group={group}
            />
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
                        checked={
                          checked?.map((p) => p.id).includes(privilege.id)
                            ? true
                            : false
                        }
                        onChange={(e) => handleChangePrivileges(privilege, e)}
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
                    Update group
                  </Button>
                </Grid>
                <Hidden smDown={true}>
                  <Grid item xs={12} style={{ marginTop: "-20px" }}></Grid>
                  <Grid item xs={4}></Grid>
                </Hidden>
                <Grid item xs={12} md={4}>
                  <Button
                    onClick={() => {
                      setRedirectTo(`/groups/details/${group?.id}`);
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
                    Back to group
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
