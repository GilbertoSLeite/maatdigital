import React from "react";
import PropTypes from 'prop-types';
import { CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
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
    grid: {
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
}));

const ScreenUpdateViewOrganizer = (props) => {
    const { fNomeIn, mNomeIn, lNomeIn, paisIn, graduacaoIn, cpfIn, sexoIn, racaIn, statusIn } = props
    const classes = useStyles()
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])

    React.useEffect(() => {
        (async () => setArrayPaises(await SearchPaises()))()
    }, []);

    React.useEffect(() => {
        (async () => setArrayGraduacao(await SearchGraduation()))()
    }, []);

    function RetornarNomePais(identificado) {
        let nomePais = arrayPaises.find(paises => paises.id === identificado)
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
                                helperText='Nome do Organizador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={fNomeIn}
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
                                helperText='Segundo Nome do Organizador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={mNomeIn}
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
                                helperText='Sobrenome do Organizador do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                value={lNomeIn}
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
                                type='text'
                                helperText='País de Nacionalidade do Organizador'
                                variant='outlined'
                                margin='dense'
                                value={(RetornarNomePais(paisIn) !== undefined && RetornarNomePais(paisIn))}
                                fullWidth
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
                                type='text'
                                helperText='Graduação do Organizador'
                                variant='outlined'
                                margin='dense'
                                value={RetornarGraduacao(graduacaoIn) !== undefined && RetornarGraduacao(graduacaoIn)}
                                fullWidth
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
                                helperText='Número do CPF do Organizador'
                                size='small'
                                margin='dense'
                                type='text'
                                value={cpfIn}
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
                                    defaultValue={sexoIn}
                                >
                                    <FormControlLabel
                                        value='F'
                                        control={<Radio />}
                                        label='Feminio'
                                        labelPlacement='bottom'
                                        disabled
                                    />
                                    <FormControlLabel
                                        value='M'
                                        control={<Radio />}
                                        label='Masculino'
                                        labelPlacement='bottom'
                                        disabled
                                    />
                                    <FormControlLabel
                                        value='O'
                                        control={<Radio />}
                                        label='Outros'
                                        labelPlacement='bottom'
                                        disabled
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
                                    Raça do Organizador
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label='Raça do Organizador'
                                    name='raca_pessoas'
                                    defaultValue={racaIn}
                                >
                                    <FormControlLabel
                                        value="P"
                                        control={<Radio />}
                                        label="Preto"
                                        labelPlacement="bottom"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="B"
                                        control={<Radio />}
                                        label="Branco"
                                        labelPlacement="bottom"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="D"
                                        control={<Radio />}
                                        label="Pardo"
                                        labelPlacement="bottom"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="I"
                                        control={<Radio />}
                                        label="Indígena"
                                        labelPlacement="bottom"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="A"
                                        control={<Radio />}
                                        label="Amarelo"
                                        labelPlacement="bottom"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="S"
                                        control={<Radio />}
                                        label="S. Informação"
                                        labelPlacement="bottom"
                                        disabled
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
                            <TextField
                                type='text'
                                helperText='Status do Cadastro do Organizador'
                                variant='outlined'
                                margin='dense'
                                value={statusIn ? 'Ativo' : 'Inativo'}
                                fullWidth
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

ScreenUpdateViewOrganizer.propTypes = {
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

export default ScreenUpdateViewOrganizer;