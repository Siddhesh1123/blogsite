import React from "react";

//compnents
import { Header } from "../Header/Header";
import { Banner } from "../../banner/Banner";
import { Categories } from "./Categories";
import { Grid } from "@mui/material";

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid item lg={10} sm={10} xs={12}>
          Posts
        </Grid>
      </Grid>
    </>
  );
};
