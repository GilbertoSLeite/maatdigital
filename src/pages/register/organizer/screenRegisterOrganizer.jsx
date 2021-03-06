import React from "react";
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import InsertOrganizer from "../../../functions/register/organizer/insertDataOrganizer";
import SearchOrganizer from "../../../functions/searchData/organizer/searchOrganizer";

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

const ScreenRegisterOrganizer = () => {
    const classes = useStyles();
    const [arrayOrganizer, setArrayOrganizer] = React.useState([])
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])
    const [firstName, setFirstName] = React.useState('')
    const [middleName, setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisOrganizer, setPaisOrganizer] = React.useState('')
    const [graduacaoOrganizer, setGraduacaoOrganizer] = React.useState([])
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoOrganizer, setSexoOrganizer] = React.useState('')
    const [racaOrganizer, setRacaOrganizer] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null)

    React.useEffect(() => {
        (async () => setArrayOrganizer(await SearchOrganizer()))()
    })

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
        setTextSnackbar('Dados Inseridos com Sucesso');
        setDisableButton(true);
    };

    const falseInsert = () => {
        setOpen(true);
        setAlertSnack('error');
        setTextSnackbar('Dados N??o Foram Inseridos - Verificar Console')
    };

    const findData = () => {
        setOpen(true);
        setAlertSnack('warning');
        setTextSnackbar('J?? existe o cadastro do Organizador ' + firstName + ' ' + middleName + ' ' + lastName)
    };

    const duplicateData = () => {
        const concatenatedName = (firstName.toLowerCase().trim().replaceAll(' ', '') + middleName.toLowerCase().trim().replaceAll(' ', '') + lastName.toLowerCase().trim().replaceAll(' ', ''))
        const validatingDuplicate = arrayOrganizer.find(dadosOrganizador => (dadosOrganizador.primeiro_nome_pessoa.toLowerCase().trim().replaceAll(' ', '') + dadosOrganizador.segundo_nome_pessoa.toLowerCase().trim().replaceAll(' ', '') + dadosOrganizador.ultimo_nome_pessoa.toLowerCase().trim().replaceAll(' ', '')) === concatenatedName.toLowerCase().trim().replaceAll(' ', ''))
        return (!validatingDuplicate ? HandleSubmit() : findData())
    };

    const HandleSubmit = async () => await InsertOrganizer(dataFormatHoje, firstName, middleName, lastName, paisOrganizer, graduacaoOrganizer, numCPF, sexoOrganizer, racaOrganizer) ? trueInsert() : falseInsert()

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridCadastroOrganizador"
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
                                aria-labelledby='Nome do Organizador'
                                id='primeiro_nome_pessoa'
                                type='text'
                                label='Primeiro Nome'
                                helperText='Nome do Organizador do Livro'
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
                                aria-labelledby='Segundo Nome do Organizador'
                                id='segundo_nome_pessoa'
                                type='text'
                                label='Segundo Nome'
                                helperText='Segundo Nome do Organizador do Livro'
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
                                aria-labelledby='Sobrenome do Organizador'
                                id='ultimo_nome_pessoa'
                                type='text'
                                label='Sobrenome Nome'
                                helperText='Sobrenome do Organizador do Livro'
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
                                helperText='Data de Cadastro do Organizador'
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
                                onChange={(e, v) => setPaisOrganizer(!v ? '' : v.id)}
                                options={arrayPaises}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Pa??s de Nacionalidade do Organizador'
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
                                onChange={(e, v) => setGraduacaoOrganizer(v === '' ? '' : v)}
                                options={arrayGraduacao}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Gradua????o do Organizador'
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
                                helperText={(numCPF.length === 0 ? 'N??mero do CPF do Organizador' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o N??mero Completo do CPF' : (ValidatingCPF(numCPF) ? 'N??mero do CPF do Organizador' : 'CPF Inv??lido')))}
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
                                    Sexo do Organizador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Sexo Autor'
                                    name='sexo_pessoas'
                                    defaultValue='M'
                                    onChange={(e) => setSexoOrganizer(e.target.value)}
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
                                    Ra??a do Organizador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Ra??a do Organizador'
                                    name='raca_pessoas'
                                    defaultValue='P'
                                    onChange={(e) => setRacaOrganizer(e.target.value)}
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
                                        label="Ind??gena"
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
                                        label="S. Informa????o"
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
                    alert={alertSnack}
                    handleClose={<HandleClose />}
                />}
        </React.Fragment>
    );
}

export default ScreenRegisterOrganizer;