import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Hidden,
} from "@mui/material";
import { fontSize } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { GroupsRepository } from "./GroupsRepository";

export const GroupDetails = ({}) => {
  const { id } = useParams();
  const [group, setGroup] = useState();
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    GroupsRepository.get(id)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function createData(tableCell1, tableCell2) {
    return { tableCell1, tableCell2 };
  }

  const rows = [
    createData("Name", group?.name),
    createData("Code", group?.code),
    createData(
      "Privilege",
      group?.privileges?.map((privilege) => privilege.name).join(", ")
    ),
  ];

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
        Group Details
      </h1>
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
              fontFamily: "Helvetica, sans-serif",
              color: "#1F393C",
            }}
          >
            {group?.name}
          </Grid>
          <Grid>
            <Table>
              <TableBody>
                <Hidden smDown>
                  {rows.map((row) => (
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                      key={row.tableCell1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell width="550px" align="right">
                        {row.tableCell1}
                      </TableCell>
                      <TableCell align="left">{row.tableCell2}</TableCell>
                    </TableRow>
                  ))}
                </Hidden>
                <Hidden smUp>
                  {rows.map((row) => (
                    <TableRow
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                      }}
                      key={row.tableCell1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        {row.tableCell1}: <br />
                        {row.tableCell2}
                      </TableCell>
                    </TableRow>
                  ))}
                </Hidden>
              </TableBody>
            </Table>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  style={{
                    color: "#17202A",
                    borderColor: "#17202A",
                    marginRight: "10px",
                  }}
                  size="medium"
                  fullWidth
                  onClick={() => {
                    setRedirectTo(`/groups/delete/${id}`);
                  }}
                >
                  <strong>Delete</strong>
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "#17202A",
                    color: "#D9D9D9",
                    borderColor: "#17202A",
                  }}
                  size="medium"
                  fullWidth
                  onClick={() => {
                    setRedirectTo(`/groups/edit/${id}`);
                  }}
                >
                  <strong>Update Group</strong>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
