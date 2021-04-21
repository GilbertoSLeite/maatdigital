import React from "react";
import { 
    CssBaseline, 
    Grid, 
    makeStyles,
    Paper,
    TextField
    } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        padding: '0',
    }, 
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    grid:{
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
}));

export default function Home() {
    const classes = useStyles();

    return(
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridHome"
                    container
                    spacing={2}
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    className={classes.grid}
                >
                <Grid
                    item
                    xs={12} 
                    sm={12}
                >
                <Paper elevation={8} variant='elevation' className={classes.paper}>
                <Autocomplete 
                    autoComplete
                    renderInput={(params) =>
                        <TextField 
                            {...params}
                            type='text'
                            placeholder='Pesquise pelo Título'
                        />}
                />
                </Paper>
                </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
    
}