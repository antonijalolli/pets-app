import {
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";
import { COMMON_ACTIONS } from "../common/CommonActions";
import { PrivilegesRepository } from "./PrivilegesRepository";

export const Privileges = () => {
  const [privileges, setPrivileges] = useState();
  const [loading, setLoading] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    PrivilegesRepository.getAll(page, size)
      .then((res) => {
        setLoading(false);
        setPrivileges(res.data);
        dispatch({
          type: COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE,
          payload: { showSuccessMessage: "Fetch privileges done successfully" },
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e, value) => {
    loadData(value, 10);
  };
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid
        conatiner
        spacing={2}
        style={{
          backgroundColor: "#f1f2f6",
          height: "132px",
        }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Grid container>
            <Grid item xs={12}>
              <span
                style={{
                  fontFamily: "Copperplate, fantasy",
                  fontSize: "30px",
                  color: "#0B648A",
                  display: "block",
                  paddingTop: "50px",
                  textTransform: "uppercase",
                }}
              >
                Privileges
              </span>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                {loading && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "50px",
                      marginTop: "150px",
                    }}
                  >
                    <CircularProgress style={{ color: "black" }} />
                  </div>
                )}
                {!loading &&
                  privileges?.content?.map((privilege, index) => (
                    <TableRow>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "18px",
                          width: "980px",
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 0 ? "#F4F6F6" : "transparent",
                        }}
                        onClick={() => {
                          setRedirectTo(`/privileges/${privilege.id}`);
                        }}
                      >
                        {privilege.name}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <Grid container spacing={2}>
              <Grid
                item={12}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {privileges && privileges.number !== undefined && (
                  <Stack spacing={2} style={{ marginTop: "20px" }}>
                    <Pagination
                      color="warning"
                      count={
                        Math.floor(
                          privileges?.totalElements / privileges?.size
                        ) + 1
                      }
                      showFirstButton
                      showLastButton
                      style={{
                        color: "#D35400",
                      }}
                      page={privileges.number + 1}
                      onChange={handleChange}
                    />
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
