import React from "react";
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import UpdateCoordinator from "../../../functions/register/coordinator/updateDataCoordinator";

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

const ScreenUpdateEditCoordinator = (props) => {
    const { identificadorIn, dataCadastroIn, fNomeIn, mNomeIn, lNomeIn, paisIn, graduacaoIn, cpfIn, sexoIn, racaIn, statusIn } = props
    const classes = useStyles()
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])
    const [firstName, setFirstName] = React.useState('')
    const [middleName, setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisCoordinator, setPaisCoordinator] = React.useState('')
    const [graduacaoCoordinator, setGraduacaoCoordinator] = React.useState([])
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoCoordinator, setSexoCoordinator] = React.useState('')
    const [racaCoordinator, setRacaCoordinator] = React.useState('')
    const [newStatusCoordinator, setNewStatusStatusCoordinator] = React.useState(false)
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null);

    React.useEffect(() => {
        (async () => setArrayPaises(await SearchPaises()))()
    }, []);

    React.useEffect(() => {
        (async () => setArrayGraduacao(await SearchGraduation()))()
    }, []);

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

    const HandleSubmit = async () => await UpdateCoordinator(identificadorIn, dataCadastroIn, ((firstName === '') ? fNomeIn : firstName), ((middleName === '') ? mNomeIn : middleName), ((lastName === '') ? lNomeIn : lastName), ((paisCoordinator === '') ? paisIn : paisCoordinator), (!graduacaoCoordinator ? graduacaoIn : graduacaoCoordinator), ((numCPF === '') ? cpfIn : numCPF), ((sexoCoordinator === '') ? sexoIn : sexoCoordinator), ((racaCoordinator === '') ? racaIn : racaCoordinator), ((newStatusCoordinator === '') ? statusIn : newStatusCoordinator)) ? trueInsert() : falseInsert()

    return (
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
                        sm={4}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Nome do Coordenador'
                                id='primeiro_nome_pessoa'
                                type='text'
                                helperText='Primeiro Nome do Coordenador do Livro'
                                variant='outlined'
                                margin='dense'
                                defaultValue={fNomeIn}
                                fullWidth
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Segundo Nome do Coordenador'
                                id='segundo_nome_pessoa'
                                type='text'
                                helperText='Segundo Nome do Coordenador do Livro'
                                variant='outlined'
                                margin='dense'
                                defaultValue={mNomeIn}
                                fullWidth
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Sobrenome do Coordenador'
                                id='ultimo_nome_pessoa'
                                type='text'
                                helperText='Sobrenome do Coordenador do Livro'
                                variant='outlined'
                                margin='dense'
                                defaultValue={lNomeIn}
                                fullWidth
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                getOptionLabel={(options) => options.nome}
                                onChange={(event, value) => setPaisCoordinator(!value ? '' : value.id)}
                                options={arrayPaises}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='País de Nacionalidade do Coordenador'
                                        variant='outlined'
                                        margin='dense'
                                        fullWidth
                                    />}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                multiple
                                getOptionLabel={(options) => options.nome_graduacao}
                                onChange={(event, value) => setGraduacaoCoordinator(!value ? '' : value)}
                                options={arrayGraduacao}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Graduação do Coordenador'
                                        variant='outlined'
                                        margin='dense'
                                        fullWidth
                                    />}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                id="numero_cpf"
                                name='numero_cpf'
                                variant="outlined"
                                placeholder="Informe Número do CPF"
                                helperText={(numCPF.length === 0 ? 'Número do CPF do Coordenador' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o Número Completo do CPF' : (ValidatingCPF(numCPF) ? 'Número do CPF do Coordenador' : 'CPF Inválido')))}
                                error={numCPF.length === 0 ? false : (ValidatingCPF(numCPF) ? false : true)}
                                size='small'
                                margin='dense'
                                type='text'
                                defaultValue={cpfIn}
                                onChange={(e) => setNumCPF(e.target.value)}
                                fullWidth
                                InputProps={{
                                    inputComponent: TextFieldCPF,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <FormControl component='fieldset'>
                                <FormLabel component='legend'>
                                    Sexo do Coordenador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Sexo Autor'
                                    name='sexo_pessoas'
                                    defaultValue={sexoIn}
                                    onChange={(e) => setSexoCoordinator(e.target.value)}
                                >
                                    <FormControlLabel
                                        value='F'
                                        control={<Radio />}
                                        label='Feminio'
                                        labelPlacement='bottom'
                                    />
                                    <FormControlLabel
                                        value='M'
                                        control={<Radio />}
                                        label='Masculino'
                                        labelPlacement='bottom'
                                    />
                                    <FormControlLabel
                                        value='O'
                                        control={<Radio />}
                                        label='Outros'
                                        labelPlacement='bottom'
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <FormControl component='fieldset'>
                                <FormLabel component='legend'>
                                    Raça do Coordenador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Raça do Coordenador'
                                    name='raca_pessoas'
                                    defaultValue={racaIn}
                                    onChange={(e) => setRacaCoordinator(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="P"
                                        control={<Radio />}
                                        label="Preto"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="B"
                                        control={<Radio />}
                                        label="Branco"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="D"
                                        control={<Radio />}
                                        label="Pardo"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="I"
                                        control={<Radio />}
                                        label="Indígena"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="A"
                                        control={<Radio />}
                                        label="Amarelo"
                                        labelPlacement="bottom"
                                    />
                                    <FormControlLabel
                                        value="S"
                                        control={<Radio />}
                                        label="S. Informação"
                                        labelPlacement="bottom"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                getOptionLabel={(options) => options.value}
                                onChange={(event, value) => setNewStatusStatusCoordinator(!value ? '' : value.id)}
                                options={statusOrganizador}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Status do Cadastro do Coordenador'
                                        variant='outlined'
                                        margin='dense'
                                        fullWidth
                                    />}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
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
                                disabled={buttonDisable}
                                fullWidth
                            >
                                ATUALIZAR
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            {open &&
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

const statusOrganizador = [
    {
        "id": true,
        "value": 'Ativo'
    },
    {
        "id": false,
        "value": 'Inativo'
    }
];

ScreenUpdateEditCoordinator.propTypes = {
    identificadorIn: PropTypes.string.isRequired,
    dataCadastroIn: PropTypes.string.isRequired,
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

export default ScreenUpdateEditCoordinator;