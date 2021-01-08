import React from "react";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";

// styles
import useStyles from "./styles";
import { Typography } from "../Wrappers/Wrappers";
import { Grid } from "@material-ui/core";

// components

/**
 * 
 * @param {
 * 
 * title, selectedDate
 * handleChange
 * 
 * } param0 
 */

export default function Footer(props) {
    var classes = useStyles();
    var theme = useTheme();

    return (
        <div className={classes.container}>

            <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Typography size={12} weight="light">
                        Powered By Asile
                </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.version}>
                    <Typography size={12} weight="light">
                        Version 0.0.1
                </Typography>
                </Grid>
            </Grid>

        </div>
    );
}
