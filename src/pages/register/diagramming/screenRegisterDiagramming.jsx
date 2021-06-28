import React from "react";
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import InsertDiagramming from "../../../functions/register/diagramming/insertDataDiagramming";
import SearchDiagramming from "../../../functions/searchData/diagramming/searchDiagramming";

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

const dataHoje = new Date()
const dataFormatHoje = (dataHoje.getFullYear() + '-' + (dataHoje.getMonth() < 10 ? '0' + (dataHoje.getMonth() + 1) : (dataHoje.getMonth() + 1)) + '-' + (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()));

const ScreenRegisterDiagramming = () => {
    const classes = useStyles();
    const [arrayDiagramming, setArrayDiagramming] = React.useState([])
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
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null)

    React.useEffect(() => {
        (async () => setArrayDiagramming(await SearchDiagramming()))();
    }, [])

    React.useEffect(() => {
        (async () => setArrayPaises(await SearchPaises()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayGraduacao(await SearchGraduation()))();
    }, []);

    const CloseSnack = () => setOpen(open => !open)

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
        setTextSnackbar('Já existe o cadastro do Diagramador ' + firstName + ' ' + middleName + ' ' + lastName)
    };

    const duplicateData = () => {
        const concatenatedName = (firstName.toLowerCase().trim().replaceAll(' ', '') + middleName.toLowerCase().trim().replaceAll(' ', '') + lastName.toLowerCase().trim().replaceAll(' ', ''))
        const validatingDuplicate = arrayDiagramming.find(dadosDiagramador => (dadosDiagramador.primeiro_nome_pessoa.toLowerCase().trim().replaceAll(' ', '') + dadosDiagramador.segundo_nome_pessoa.toLowerCase().trim().replaceAll(' ', '') + dadosDiagramador.ultimo_nome_pessoa.toLowerCase().trim().replaceAll(' ', '')) === concatenatedName.toLowerCase().trim().replaceAll(' ', ''))
        return (!validatingDuplicate ? HandleSubmit() : findData())
    };

    const HandleSubmit = async () => await InsertDiagramming(dataFormatHoje, firstName, middleName, lastName, paisDiagramming, graduacaoDiagramming, numCPF, sexoDiagramming, racaDiagramming) ? trueInsert : falseInsert

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridCadastroDiagramador"
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
                                aria-labelledby='Nome do Diagramador'
                                id='primeiro_nome_pessoa'
                                type='text'
                                label='Primeiro Nome'
                                helperText='Nome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
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
                                aria-labelledby='Segundo Nome do Diagramador'
                                id='segundo_nome_pessoa'
                                type='text'
                                label='Segundo Nome'
                                helperText='Segundo Nome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
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
                                aria-labelledby='Sobrenome do Diagramador'
                                id='ultimo_nome_pessoa'
                                type='text'
                                label='Sobrenome Nome'
                                helperText='Sobrenome do Diagramador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setLastName(e.target.value)}
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
                                aria-labelledby='Data de Cadastro'
                                id='data_cadastro'
                                type='date'
                                helperText='Data de Cadastro do Diagramador'
                                variant='outlined'
                                margin='dense'
                                value={dataFormatHoje}
                                disabled
                                fullWidth
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
                            <Autocomplete
                                getOptionSelected={(o, v) => (o.option === v.value)}
                                getOptionLabel={(o) => o.nome}
                                onChange={(e, v) => setPaisDiagramming(!v ? '' : v.id)}
                                options={arrayPaises}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='País de Nacionalidade do Diagramador'
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
                        sm={4}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                multiple
                                getOptionLabel={(o) => o.nome_graduacao}
                                onChange={(e, v) => setGraduacaoDiagramming(v === '' ? '' : v)}
                                options={arrayGraduacao}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Graduação do Diagramador'
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
                                helperText={(numCPF.length === 0 ? 'Número do CPF do Diagramador' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o Número Completo do CPF' : (ValidatingCPF(numCPF) ? 'Número do CPF do Diagramador' : 'CPF Inválido')))}
                                error={numCPF.length === 0 ? false : (ValidatingCPF(numCPF) ? false : true)}
                                size='small'
                                margin='dense'
                                type='text'
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
                                    Sexo do Diagramador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Sexo Autor'
                                    name='sexo_pessoas'
                                    defaultValue='M'
                                    onChange={(e) => setSexoDiagramming(e.target.value)}
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
                                    Raça do Diagramador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Raça do Diagramador'
                                    name='raca_pessoas'
                                    defaultValue='P'
                                    onChange={(e) => setRacaDiagramming(e.target.value)}
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
                            <Button
                                size='large'
                                variant='outlined'
                                startIcon={<Save />}
                                disabled={buttonDisable}
                                onClick={duplicateData}
                                fullWidth
                            >
                                SALVAR
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
                    alert={alertSnack}
                />}
        </React.Fragment>
    );
}

export default ScreenRegisterDiagramming;