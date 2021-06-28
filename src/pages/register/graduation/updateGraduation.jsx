import React from "react";
import PropTypes from 'prop-types';
import { Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from "@material-ui/core";
import SnackMAAT from "../../../components/snackbar/snackbar";
import { Close, Save } from "@material-ui/icons";
import UpdateBaseGraduation from "../../../functions/register/graduation/updateBaseGraduation";

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
    grid: {
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
}));

const UpdateGraduation = (props) => {
    const { identificadorIn, nomeGraduacaoIn, siglaGraduacaoIn } = props;
    const classes = useStyles();
    const [graduacao, setGraduacao] = React.useState('')
    const [siglaGraduacao, setSiglaGraduacao] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [textSnackBar, setTextSnackbar] = React.useState('');
    const [edicao, setEdicao] = React.useState(false);
    const [alertSnack, setAlertSnack] = React.useState(null);

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

    const trueInsert = () => {
        setOpen(true);
        setAlertSnack('success');
        setTextSnackbar('Dados Atualizados com Sucesso');
        setDisableButton(true);
    };

    const falseInsert = () => {
        setOpen(true);
        setAlertSnack('error');
        setTextSnackbar('Dados Não Foram Atualizados - Verificar Console')
    };

    const HandleSubmit = async () => await UpdateBaseGraduation(identificadorIn, (graduacao === '' ? nomeGraduacaoIn : graduacao), (siglaGraduacao === '' ? siglaGraduacaoIn : siglaGraduacao)) ? trueInsert() : falseInsert()

    return (
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
                        sm={4}
                    >
                        <Tooltip
                            arrow
                            title='Código de Registro da Graudação que Será Vinculada ao Autor do Livro'
                        >
                            <Paper
                                elevation={8}
                                variant='elevation'
                                className={classes.paper}
                            >
                                <TextField
                                    aria-labelledby='Código da Graduação'
                                    id='id'
                                    type='text'
                                    helperText='Identificador da Graudação do Autor'
                                    variant='outlined'
                                    margin='dense'
                                    value={identificadorIn}
                                    fullWidth
                                    disabled
                                />
                            </Paper>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
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
                                    helperText='Graudação do Autor'
                                    variant='outlined'
                                    margin='dense'
                                    value={edicao ? null : nomeGraduacaoIn}
                                    onChange={(e) => setGraduacao(e.target.value)}
                                    onClick={() => setEdicao(true)}
                                    fullWidth
                                />
                            </Paper>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                    >
                        <Tooltip
                            arrow
                            title='Digite a Sigla Graudação que Será Vinculada ao Autor do Livro'
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
                                    helperText='Sigla da Graudação do Autor'
                                    variant='outlined'
                                    margin='dense'
                                    value={edicao ? null : siglaGraduacaoIn}
                                    onChange={(e) => setSiglaGraduacao(e.target.value)}
                                    onClick={() => setEdicao(true)}
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
                                    startIcon={<Save />}
                                    onClick={HandleSubmit}
                                    disabled={(((graduacao === '') && (siglaGraduacao === '')) ? true : buttonDisable)}
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
}

UpdateGraduation.propTypes = {
    identificadorIn: PropTypes.string.isRequired,
    nomeGraduacaoIn: PropTypes.string.isRequired,
    siglaGraduacaoIn: PropTypes.string.isRequired,
};

export default UpdateGraduation;