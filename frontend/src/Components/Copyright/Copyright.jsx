import "./Copyright.css";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

const Copyright = (props) => {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Travel Journal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );

};

export default Copyright;