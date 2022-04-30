import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import img from "../images/petsimage.jpg";
export const Home = ({}) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            background: "#f1f2f6",
            height: "150px",
            backgroundImage: `url(${img})`,
          }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={12} style={{}}>
                <span
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#0B648A",
                    display: "block",
                    paddingTop: "200px",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
