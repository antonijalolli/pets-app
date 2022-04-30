import {
  CircularProgress,
  Grid,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PrivilegesRepository } from "./PrivilegesRepository";

export const PrivilegeDetails = ({}) => {
  const { id } = useParams();
  const [privilege, setPrivilege] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    PrivilegesRepository.get(id)
      .then((res) => {
        setLoading(false);
        setPrivilege(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
        Privilege Details
      </h1>
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            marginTop: "150px",
            fontFamily: "Helvetica, sans-serif",
            color: "#1F393C",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid
              item
              xs={8}
              md={11}
              style={{
                fontWeight: "bold",
                lineHeight: 3.6,
                fontSize: "x-large",
              }}
            >
              {privilege?.name}
            </Grid>
            <Grid>
              <Table>
                <TableBody>
                  <Hidden smDown>
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <TableCell width="550px" align="right">
                        Name
                      </TableCell>
                      <TableCell align="left">{privilege?.name}</TableCell>
                    </TableRow>
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <TableCell width="550px" align="right">
                        ID
                      </TableCell>
                      <TableCell align="left">{privilege?.id}</TableCell>
                    </TableRow>
                  </Hidden>
                  <Hidden smUp>
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <TableCell align="left">
                        Name: <br />
                        {privilege?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                    >
                      <TableCell align="left">
                        ID: <br />
                        {privilege?.id}
                      </TableCell>
                    </TableRow>
                  </Hidden>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
