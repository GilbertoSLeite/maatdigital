import React from "react";
import { Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from "@material-ui/core";
import SnackMAAT from "../../../components/snackbar/snackbar";
import { Close, Save } from "@material-ui/icons";
import InsertGraduation from "../../../functions/register/graduation/insertGraduation";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";

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
    const [arrayGraduacao, setArrayGraduacao] = React.useState([]);
    const [graduacao, setGraduacao] = React.useState('')
    const [siglaGraduacao, setSiglaGraduacao] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [textSnackBar, setTextSnackbar] = React.useState('');
    const [alertSnack, setAlertSnack] = React.useState(null);

    React.useEffect(() => {
        (async () => setArrayGraduacao(await SearchGraduation()))();
    },[]);
    
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

    const duplicateData = () => {
        const validatingDuplicate = arrayGraduacao.find(graduacaoData => graduacaoData.nome_graduacao.toLowerCase().trim().replace(' ','') === graduacao.toLowerCase().trim().replace(' ',''))
        return (!validatingDuplicate ? HandleSubmit(): findData())
    };
    
    const trueInsert = () => {
        setOpen(true);
        setAlertSnack('success');
        setTextSnackbar('Dados Inseridos com Sucesso');
        setDisableButton(true);
    };

    const falseInsert = () => {
        setOpen(true);
        setAlertSnack('error');
        setTextSnackbar('Dados Não Foram Inseridos - Verificar Console')          
    };

    const findData = () => {
        setOpen(true);
        setAlertSnack('warning');
        setTextSnackbar('Já existe o cadastro da graduação ' + graduacao)
    };

    const HandleSubmit = async () => await InsertGraduation(graduacao, siglaGraduacao) ? trueInsert() : falseInsert()  

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
                    sm={6}
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
                    sm={6}
                >
                    <Tooltip 
                    arrow 
                    title='Digite a Sigla da Graudação que Será Vinculada ao Autor do Livro'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Sigla da Graduação'
                                id='sigla_graduacao'
                                type='text'
                                label='Sigla da Graduação'
                                helperText='Sigla da Graudação do Autor'
                                variant='outlined'
                                margin='dense'
                                onChange={(e) => setSiglaGraduacao(e.target.value)}
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
                            onClick={duplicateData}
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
                    alert={alertSnack}
                    handleClose={<HandleClose />} 
                />} 
        </React.Fragment>       
    );
};