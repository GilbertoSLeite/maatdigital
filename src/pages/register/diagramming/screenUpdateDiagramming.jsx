import React from "react";
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, Switch, TextField, Typography } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import UpdateDiagramming from "../../../functions/register/diagramming/updateDataDiagramming";

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

const ScreenUpdateDiagramming = (props) => {
    const {
        identificadorIn,
        dataCadastroIn,
        fNomeIn,
        mNomeIn,
        lNomeIn,
        paisIn,
        graduacaoIn,
        cpfIn,
        sexoIn,
        racaIn,
        statusIn
    } = props
    const classes = useStyles()
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])
    const [firstName, setFirstName] = React.useState('')
    const [middleName, setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisDiagramming, setPaisDiagramming] = React.useState('')
    const [graduacaoDiagramming, setGraduacaoDiagramming] = React.useState([])
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoDiagramming, setSexoDiagramming] = React.useState('')
    const [racaDiagramming, setRacaDiagramming] = React.useState('')
    const [newStatusDiagramming, setNewStatusStatusDiagramming] = React.useState(false)
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [edicao, setEdicao] = React.useState(false);

    React.useEffect(() => {
        const RetornarPaises = async () => setArrayPaises(await SearchPaises())
        RetornarPaises()
    }, []);

    React.useEffect(() => {
        const RetornarGraduacao = async () => setArrayGraduacao(await SearchGraduation())
        RetornarGraduacao()
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

    function RetornarNomePais(identificador) {
        const nomePais = arrayPaises.find(paises => paises.id === identificador)
        return (nomePais && nomePais.nome)
    }

    function RetornarGraduacao(identificado) {
        let nomeGraduacao = '';
        for (const dados of identificado) {
            let graduacaoDados = arrayGraduacao.find(graduacao => (graduacao.id === dados))
            nomeGraduacao += (graduacaoDados && graduacaoDados.nome_graduacao) + ' '
        }
        return (nomeGraduacao !== undefined && nomeGraduacao)
    }

    const HandleSubmit = async () => await UpdateDiagramming(identificadorIn, dataCadastroIn, ((firstName === '') ? fNomeIn : firstName), ((middleName === '') ? mNomeIn : middleName), ((lastName === '') ? lNomeIn : lastName), ((paisDiagramming === '') ? paisIn : paisDiagramming), (graduacaoDiagramming), ((numCPF === '') ? cpfIn : numCPF), ((sexoDiagramming === '') ? sexoIn : sexoDiagramming), ((racaDiagramming === '') ? racaIn : racaDiagramming), ((newStatusDiagramming === '') ? statusIn : newStatusDiagramming)) ? setOpen(true) || setTextSnackbar('Dados Atualizado com Sucesso') || setDisableButton(true) : setOpen(true) || setTextSnackbar('Dados N??o Foram Atualizados - Verificar Console');

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridCadastroRespCapa"
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
                                        {edicao ? 'Modo Edi????o' : 'Modo Visualiza????o'}
                                    </Grid>
                                </Grid>
                            </Typography>
                        </FormGroup>
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
                                aria-labelledby='Nome do Diagramador'
                                id='primeiro_nome_pessoa'
                                type='text'
                                helperText='Nome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={edicao ? null : fNomeIn}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={edicao ? false : true}
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
                                aria-labelledby='Segundo Nome do Diagramador'
                                id='segundo_nome_pessoa'
                                type='text'
                                helperText='Segundo Nome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={edicao ? null : mNomeIn}
                                onChange={(e) => setMiddleName(e.target.value)}
                                disabled={edicao ? false : true}
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
                                aria-labelledby='Sobrenome do Diagramador'
                                id='ultimo_nome_pessoa'
                                type='text'
                                helperText='Sobrenome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={edicao ? null : lNomeIn}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={edicao ? false : true}
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
                                inputValue={edicao ? (RetornarNomePais(paisDiagramming) === undefined ? '' : RetornarNomePais(paisDiagramming)) : (RetornarNomePais(paisIn) === undefined ? '' : RetornarNomePais(paisIn))}
                                getOptionLabel={(o) => o.nome}
                                onChange={(e, v) => setPaisDiagramming(!v ? '' : v.id)}
                                options={arrayPaises}
                                disabled={edicao ? false : true}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Pa??s de Nacionalidade do Diagramador'
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
                                inputValue={edicao ? '' : RetornarGraduacao(graduacaoIn)}
                                getOptionLabel={(o) => o.nome_graduacao}
                                onChange={(e, v) => setGraduacaoDiagramming(!v ? '' : v)}
                                options={arrayGraduacao}
                                disabled={edicao ? false : true}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Gradua????o do Diagramador'
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
                                placeholder="Informe N??mero do CPF"
                                helperText={(numCPF.length === 0 ? 'N??mero do CPF do Diagramador' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o N??mero Completo do CPF' : (ValidatingCPF(numCPF) ? 'N??mero do CPF do Diagramador' : 'CPF Inv??lido')))}
                                error={numCPF.length === 0 ? false : (ValidatingCPF(numCPF) ? false : true)}
                                size='small'
                                margin='dense'
                                type='text'
                                value={edicao ? null : cpfIn}
                                onChange={(e) => setNumCPF(e.target.value)}
                                fullWidth
                                InputProps={{
                                    inputComponent: TextFieldCPF,
                                }}
                                disabled={edicao ? false : true}
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
                                    Sexo do Diagramador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Sexo Autor'
                                    name='sexo_pessoas'
                                    defaultValue={sexoIn}
                                    onChange={(e) => setSexoDiagramming(e.target.value)}
                                >
                                    <FormControlLabel
                                        value='F'
                                        control={<Radio />}
                                        label='Feminio'
                                        labelPlacement='bottom'
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value='M'
                                        control={<Radio />}
                                        label='Masculino'
                                        labelPlacement='bottom'
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value='O'
                                        control={<Radio />}
                                        label='Outros'
                                        labelPlacement='bottom'
                                        disabled={edicao ? false : true}
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
                                    Ra??a do Diagramador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Ra??a do Diagramador'
                                    name='raca_pessoas'
                                    defaultValue={racaIn}
                                    onChange={(e) => setRacaDiagramming(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="P"
                                        control={<Radio />}
                                        label="Preto"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value="B"
                                        control={<Radio />}
                                        label="Branco"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value="D"
                                        control={<Radio />}
                                        label="Pardo"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value="I"
                                        control={<Radio />}
                                        label="Ind??gena"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value="A"
                                        control={<Radio />}
                                        label="Amarelo"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
                                    />
                                    <FormControlLabel
                                        value="S"
                                        control={<Radio />}
                                        label="S. Informa????o"
                                        labelPlacement="bottom"
                                        disabled={edicao ? false : true}
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
                                inputValue={edicao ? (newStatusDiagramming ? 'Ativo' : '') : (statusIn ? 'Ativo' : 'Inativo')}
                                getOptionLabel={(o) => o.value}
                                onChange={(e, v) => setNewStatusStatusDiagramming(!v ? '' : v.id)}
                                options={statusDiagramming}
                                disabled={edicao ? false : true}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Status do Cadastro do Diagramador'
                                        variant='outlined'
                                        margin='dense'
                                        onClick={() => setEdicao(true)}
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
                                disabled={(edicao ? false : (!edicao ? true : buttonDisable))}
                                onClick={HandleSubmit}
                                fullWidth
                            >
                                ATUALIZAR
                            </Button>
                        </Paper>
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
}

const statusDiagramming = [
    {
        "id": true,
        "value": 'Ativo'
    },
    {
        "id": false,
        "value": 'Inativo'
    }
];

ScreenUpdateDiagramming.propTypes = {
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

export default ScreenUpdateDiagramming;