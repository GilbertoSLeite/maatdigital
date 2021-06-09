import React from "react";
import PropTypes from 'prop-types';
import { CssBaseline, FormGroup, Grid, makeStyles,  Switch,Typography } from "@material-ui/core";
import ScreenUpdateEditCoordinator from "./screenEditUpdateCoordinator";
import ScreenUpdateViewCoordinator from "./screenViewUpdateCoordinator";

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

export default function ScreenUpdateCoordinator(props) {
    const{identificadorIn, dataCadastroIn, fNomeIn, mNomeIn, lNomeIn, paisIn, graduacaoIn, cpfIn, sexoIn, racaIn, statusIn} = props    
    const classes = useStyles()
    const [edicao, setEdicao] = React.useState(false)

    return(
        <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
        <Grid
            id="GridCadastroCoordenador"
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
                <FormGroup>
                    <Typography
                        component='div'
                        variant='h6'
                    >
                        <Grid
                            component='label' 
                            container 
                            spacing={1}
                        >
                            <Grid item>
                            <Switch 
                                checked={edicao} 
                                name="checkedC"
                                size='medium'
                                onChange={() => setEdicao(edicao ? false : true)}
                            />
                            </Grid>
                            <Grid item>
                                {edicao ? 'Modo Edição' : 'Modo Visualização'}
                            </Grid>
                        </Grid>
                    </Typography>
                </FormGroup>
            </Grid>
            {edicao ? 
            <ScreenUpdateEditCoordinator
                    identificadorIn={identificadorIn}
                    dataCadastroIn={dataCadastroIn}
                    fNomeIn={fNomeIn}
                    mNomeIn={mNomeIn}
                    lNomeIn={lNomeIn}
                    paisIn={paisIn}
                    graduacaoIn={graduacaoIn}
                    cpfIn={cpfIn} 
                    sexoIn={sexoIn}
                    racaIn={racaIn}
                    statusIn={statusIn}  /> : 
            <ScreenUpdateViewCoordinator
                    fNomeIn={fNomeIn}
                    mNomeIn={mNomeIn}
                    lNomeIn={lNomeIn}
                    paisIn={paisIn}
                    graduacaoIn={graduacaoIn}
                    cpfIn={cpfIn} 
                    sexoIn={sexoIn}
                    racaIn={racaIn}
                    statusIn={statusIn}  />}            
        </Grid>
        </div> 
        </React.Fragment>
    );
};

ScreenUpdateCoordinator.propTypes = {
        fNomeIn: PropTypes.string.isRequired,
        mNomeIn: PropTypes.string.isRequired,
        lNomeIn: PropTypes.string.isRequired,
        paisIn: PropTypes.string.isRequired,
        graduacaoIn: PropTypes.array.isRequired, 
        cpfIn: PropTypes.string.isRequired, 
        sexoIn: PropTypes.string.isRequired,
        racaIn: PropTypes.string.isRequired,
        statusIn: PropTypes.bool.isRequired
    }