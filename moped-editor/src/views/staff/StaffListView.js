import React, { useState } from "react";

import {
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
} from "@material-ui/core";
import Page from "src/components/Page";

import { StaffListViewQueryConf } from "./StaffListViewQueryConf";
import { GQLAbstract } from "atd-kickstand";
import GridTable from "../../components/GridTable/GridTable";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  switch: {
    marginTop: "1rem",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

let staffQuery = new GQLAbstract(StaffListViewQueryConf);

const StaffListView = () => {
  const classes = useStyles();

  const [showInactive, setShowInactive] = useState(false);

  return (
    <Page className={classes.root} title="Staff">
      <GridTable title={"Staff"} query={staffQuery} toolbar={null} />
    </Page>
  );
};

export default StaffListView;
