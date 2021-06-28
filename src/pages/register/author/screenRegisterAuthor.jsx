import React from "react";
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import InsertAuthor from "../../../functions/register/author/insertAuthor";
import IdentifyingDuplicate from "../../../functions/identifyingDuplicate/identifyingDuplicate";

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

const ScreenRegisterAuthor = () => {
    const classes = useStyles();
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])
    const [firstName, setFirstName] = React.useState('')
    const [middleName, setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisAutor, setPaisAutor] = React.useState('')
    const [graduacaoAutor, setGraduacaoAutor] = React.useState([])
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoAutor, setSexoAutor] = React.useState('M')
    const [racaAutor, setRacaAutor] = React.useState('P')
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null)

    React.useEffect(() => {
        const RetornarPaises = async () =>
            setArrayPaises(await SearchPaises())
        RetornarPaises()
    }, []);

    React.useEffect(() => {
        const RetornarGraduacao = async () =>
            setArrayGraduacao(await SearchGraduation())
        RetornarGraduacao()
    }, []);

    const CloseSnack = () =>
        setOpen(false)

    const HandleClose = () => {
        return (
            <IconButton
                aria-label='Fechar'
                color='inherit'
                size='small'
                onClick={CloseSnack}
            >
                <Close fontSize='inherit' />
            </IconButton>
        );
    };

    async function RatedData(statusRated) {
        try {
            if (statusRated) {
                setOpen(true)
                setAlertSnack('warning')
                setTextSnackbar('Já existe um ' + firstName + ' ' + middleName + ' ' + lastName + ' no Banco de Dados')
            } else {
                await HandleSubmit()
            }
        } catch (error) {
            console.error('Error na validação dos dados em RatedData ' + error);
        }
    }

    async function validatingData() {
        try {
            const ConcatenatingNames = ((firstName.toLowerCase().trim().replace(' ', '')) + (middleName.toLowerCase().trim().replace(' ', '')) + (lastName.toLowerCase().trim().replace(' ', '')))
            const ratedData = await IdentifyingDuplicate('autores', ConcatenatingNames)
            await RatedData(ratedData)
        } catch (error) {
            console.error('Error ocorrido na validação dos dados em validatingData - ScreenRegisterCover ' + error)
        }
    }

    async function HandleSubmit() {
        try {
            let isInsert = await InsertAuthor(dataFormatHoje, firstName, middleName, lastName, paisAutor, graduacaoAutor, numCPF, sexoAutor, racaAutor)
            if (isInsert) {
                setOpen(true)
                setAlertSnack('success')
                setTextSnackbar('Dados Inseridos com Sucesso')
                setDisableButton(true)
            } else {
                setOpen(true)
                setAlertSnack('error')
                setTextSnackbar('Dados Não Forma Inseridos - Verificar Console')
            }
        } catch (error) {
            console.error('Error na inserção de dados em HandleSubmit ' + error)
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    id="GridCadastroAutor"
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
                                aria-labelledby='Nome do Autor'
                                id='primeiro_nome_pessoa'
                                type='text'
                                label='Primeiro Nome'
                                helperText='Nome do Autor do Livro'
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
                                aria-labelledby='Segundo Nome do Autor'
                                id='segundo_nome_pessoa'
                                type='text'
                                label='Segundo Nome'
                                helperText='Segundo Nome do Autor do Livro'
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
                                aria-labelledby='Sobrenome do Autor'
                                id='ultimo_nome_pessoa'
                                type='text'
                                label='Sobrenome Nome'
                                helperText='Sobrenome do Autor do Livro'
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
                                helperText='Data de Cadastro da Editora'
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
                                onChange={(e, v) => setPaisAutor(!v ? '' : v.id)}
                                options={arrayPaises}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='País de Nacionalidade do Autor'
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
                                onChange={(e, v) => setGraduacaoAutor(v === '' ? '' : v)}
                                options={arrayGraduacao}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Graduação do Autor'
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
                                helperText={(numCPF.length === 0 ? 'Número do CPF do Autor' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o Número Completo do CPF' : (ValidatingCPF(numCPF) ? 'Número do CPF do Autor' : 'CPF Inválido')))}
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
                                    Sexo do Autor
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Sexo Autor'
                                    name='sexo_pessoas'
                                    defaultValue={sexoAutor}
                                    onChange={(e) => setSexoAutor(e.target.value)}
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
                                    Raça do Autor
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Raça do Autor'
                                    name='raca_pessoas'
                                    defaultValue={racaAutor}
                                    onChange={(e) => setRacaAutor(e.target.value)}
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
                                onClick={validatingData}
                                fullWidth
                            >
                                SALVAR
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
                    handleClose={<HandleClose />}
                    alert={alertSnack}
                />}
        </React.Fragment>
    );
}

export default ScreenRegisterAuthor;