import React from "react";
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../componets/textField/textFieldCPF";
import SnackMAAT from "../../../componets/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import UpdateAuthor from "../../../functions/register/author/updateAuthor";

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

export default function ScreenUpdateAuthor(props) {
    const{
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
    const [middleName , setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisAutor, setPaisAutor] = React.useState('')
    const [graduacaoAutor, setGraduacaoAutor ] = React.useState('')
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoAutor, setSexoAutor] = React.useState('')
    const [racaAutor, setRacaAutor] = React.useState('')
    const [newStatusEditor, setNewStatusEditora] = React.useState(false)
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [edicao, setEdicao] = React.useState(false);

    React.useEffect(() => {
        const RetornarPaises = async () => setArrayPaises(await SearchPaises())
        RetornarPaises()
    },[]);

    React.useEffect(() => {
        const RetornarGraduacao = async () => setArrayGraduacao(await SearchGraduation())
        RetornarGraduacao()
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

    function RetornarNomePais(identificado){
        function CountrieFilter(array) {
            if(array.id === identificado){
                return array
            };
        }
        let nomePais = arrayPaises.map(x => x).filter(CountrieFilter);
        nomePais = nomePais.map(x => x.nome)
        return nomePais[0]
    };

    function RetornarGraduacao(identificado){
        function GraduationFilter(array) {
            if(array.id === identificado){
                return array
            };
        }
        let nomeGraduacao = arrayGraduacao.map(x => x).filter(GraduationFilter);
        nomeGraduacao = nomeGraduacao.map(x => x.nome_graduacao)
        return nomeGraduacao[0]
    };

    const HandleSubmit = async () => await UpdateAuthor(identificadorIn, dataCadastroIn, ((firstName === '')? fNomeIn : firstName) , ((middleName === '')? mNomeIn : middleName) ,((lastName === '')? lNomeIn : lastName), ((paisAutor === '')? paisIn : paisAutor), ((graduacaoAutor === '')? graduacaoIn : graduacaoAutor) , ((numCPF === '')? cpfIn : numCPF), ((sexoAutor === '')? sexoIn : sexoAutor), ((racaAutor === '')? racaIn : racaAutor), ((newStatusEditor === '')? statusIn : newStatusEditor) ) ? setOpen(true) || setTextSnackbar('Dados Atualizado com Sucesso') || setDisableButton(true) : setOpen(true) || setTextSnackbar('Dados Não Foram Atualizados - Verificar Console'); 
    
    return(
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
                        value={edicao ? null : fNomeIn}
                        onClick={() => setEdicao(true)}
                        onChange={(e)=>setFirstName(e.target.value)}
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
                        value={edicao ? null : mNomeIn}
                        onClick={() => setEdicao(true)}
                        onChange={(e)=>setMiddleName(e.target.value)}
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
                        value={edicao ? null : lNomeIn}
                        onClick={() => setEdicao(true)}
                        onChange={(e)=>setLastName(e.target.value)}
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
                        inputValue={RetornarNomePais(paisIn) === undefined ? '' : RetornarNomePais(paisIn)}
                        getOptionSelected={(o,v) =>  (o.option === v.value)}
                        getOptionLabel={(o) => o.nome}
                        onChange={(e,v) => setPaisAutor(!v? '' : v.id)}
                        options={arrayPaises} 
                        onClick={() => setEdicao(true)}
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
                sm={6}
            >
                <Paper
                    elevation={8}
                    variant='elevation'
                    className={classes.paper}
                >   
                    <Autocomplete
                        inputValue={RetornarGraduacao(graduacaoIn) === undefined ? '' : RetornarGraduacao(graduacaoIn)}
                        getOptionSelected={(o,v) =>  (o.option === v.value)}
                        getOptionLabel={(o) => o.nome}
                        onChange={(e,v) => setGraduacaoAutor(!v? '' : v.id)}
                        options={arrayGraduacao} 
                        onClick={() => setEdicao(true)}
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
                        helperText={(numCPF.length === 0 ? 'Número do CPF do Autor' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o Número Completo do CPF' : ( ValidatingCPF(numCPF) ? 'CPF Inválido' : 'Número do CPF do Autor')))}
                        error={ValidatingCPF(numCPF)}
                        size='small'
                        margin='dense' 
                        type='text'  
                        value={edicao ? null : cpfIn}
                        onClick={() => setEdicao(true)}
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
                            defaultValue={sexoIn}
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
                            defaultValue={racaIn}
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
                    <Autocomplete
                        getOptionSelected={(o,v) =>  (o.option === v.value)}
                        inputValue={statusIn ? 'Ativo' : 'Inativo'}
                        getOptionLabel={(o) => o.value}
                        onChange={(v) => setNewStatusEditora(!v? '' : v.id)}
                        options={statusAutor} 
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                type='text'
                                helperText='Status do Cadastro do Autor'
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
                        startIcon={<Save/>}
                        disabled={buttonDisable}
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
};

const statusAutor = [
    {
        "id": true,
        "value": 'Ativo'
    }, 
    {
        "id": false,
        "value": 'Inativo'
    }
];

ScreenUpdateAuthor.propTypes = {
        fNomeIn: PropTypes.string.isRequired,
        mNomeIn: PropTypes.string.isRequired,
        lNomeIn: PropTypes.string.isRequired,
        paisIn: PropTypes.string.isRequired,
        graduacaoIn: PropTypes.string.isRequired, 
        cpfIn: PropTypes.string.isRequired, 
        sexoIn: PropTypes.string.isRequired,
        racaIn: PropTypes.string.isRequired,
        statusIn: PropTypes.bool.isRequired
    }