import React from "react";
import { Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from "@material-ui/core";
import SnackMAAT from "../../../componets/snackbar/snackbar";
import { Close, Save } from "@material-ui/icons";
import InsertGraduation from "../../../functions/register/graduation/insertGraduation";

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

export default function RegisterGraduation() {
    const classes = useStyles();
    const [graduacao, setGraduacao] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [textSnackBar, setTextSnackbar] = React.useState('');
    
    const CloseSnack = () => setOpen(false)

    const HandleClose = () => {
        return (
            <IconButton
                aria-label='Close'
                color='inherit'
                size='small'
                onClick={CloseSnack}
            >
                <Close fontSize='inherit' />
            </IconButton>
        );
    };

    const HandleSubmit = async () => await InsertGraduation(graduacao) ? setOpen(true) || setTextSnackbar('Dados Inseridos com Sucesso') || setDisableButton(true) : setOpen(true) || setTextSnackbar('Dados Não Forma Inseridos - Verificar Console');

    return(
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
            <Grid
                id="GridCadastroGraduacao"
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
                    <Tooltip 
                    arrow 
                    title='Digite a Graudação que Será Vinculada ao Autor do Livro'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Nome da Graduação'
                                id='nome_graduacao'
                                type='text'
                                label='Nome da Graduação'
                                helperText='Graudação do Autor'
                                variant='outlined'
                                margin='dense'
                                onChange={(e) => setGraduacao(e.target.value)}
                                fullWidth
                            />
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                >
                    <Tooltip
                        aria-labelledby='Balão do Butão para Salvar'
                        arrow
                        title='Clique para Salvar as informações digitadas'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                        <Button
                            size='large'
                            variant='outlined'
                            startIcon={<Save/>}
                            disabled={buttonDisable}
                            onClick={HandleSubmit}
                            fullWidth
                        >
                            SALVAR
                        </Button>
                        </Paper>
                    </Tooltip>
                </Grid>
                </Grid>
            </div>
            {!open ? null : 
                <SnackMAAT
                    open={open} 
                    close={CloseSnack} 
                    textSnack={textSnackBar} 
                    handleClose={<HandleClose />} 
                />} 
        </React.Fragment>       
    );
};