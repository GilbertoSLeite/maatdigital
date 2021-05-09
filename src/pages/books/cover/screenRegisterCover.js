import React from "react";
import { Button, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import { Close, Save } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import ValidatingCPF from "../../../functions/validatingData/validatingCPF";
import TextFieldCPF from "../../../components/textField/textFieldCPF";
import SnackMAAT from "../../../components/snackbar/snackbar";
import SearchGraduation from "../../../functions/searchData/graduation/returnGraduation";
import InsertCover from "../../../functions/register/cover/insertDataCover";
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
    grid:{
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
}));

const dataHoje = new Date()
const dataFormatHoje = (dataHoje.getFullYear() +'-'+ (dataHoje.getMonth() < 10 ? '0' + (dataHoje.getMonth() +1) : (dataHoje.getMonth() +1)) +'-'+ (dataHoje.getDate() < 10 ? '0' + dataHoje.getDate() : dataHoje.getDate()) );

export default function ScreenRegisterCover() {
    const classes = useStyles();
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])
    const [firstName, setFirstName] = React.useState('')
    const [middleName , setMiddleName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [paisCover, setPaisCover] = React.useState('')
    const [graduacaoCover, setGraduacaoCover ] = React.useState([])
    const [numCPF, setNumCPF] = React.useState('');
    const [sexoCover, setSexoCover] = React.useState('')
    const [racaCover, setRacaCover] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null)

    React.useEffect(() => {
        const RetornarPaises = async () => setArrayPaises(await SearchPaises())
        RetornarPaises()
    },[]);

    React.useEffect(() => {
        const RetornarGraduacao = async () => setArrayGraduacao(await SearchGraduation())
        RetornarGraduacao()
    },[]);

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

    async function validatingData(){
        try {
            const ConcatenatingNames = ((firstName.toLowerCase().trim()) + (middleName.toLowerCase().trim()) + (lastName.toLowerCase().trim()))
            const ratedData = await IdentifyingDuplicate('resp_capas', ConcatenatingNames) 
            console.log('ratedData: ', ratedData)
            ratedData ? setOpen(true) || setAlertSnack('warning') || setTextSnackbar('Já existe um ' + firstName + ' ' + middleName + ' ' + lastName + ' no Banco de Dados')  : HandleSubmit()
        } catch (error) {
            console.error('Error ocorrido na validação dos dados em validatingData - ScreenRegisterCover ' + error)
        };        
    };
    
    const HandleSubmit = async () => await InsertCover(dataFormatHoje, firstName, middleName,lastName, paisCover, graduacaoCover, numCPF, sexoCover, racaCover) ? setOpen(true) || setAlertSnack('success') ||  setTextSnackbar('Dados Inseridos com Sucesso') || setDisableButton(true) : setOpen(true) || setAlertSnack('error') ||  setTextSnackbar('Dados Não Forma Inseridos - Verificar Console'); 
    
    return(
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
                sm={4}
            >
                <Paper 
                    elevation={8}
                    variant='elevation'
                    className={classes.paper}
                >
                    <TextField
                        aria-labelledby='Nome do Resp. pela Capa'
                        id='primeiro_nome_pessoa'
                        type='text'
                        label='Primeiro Nome'
                        helperText='Nome do Resp. pela Capa do Livro'
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        onChange={(e)=> setFirstName(e.target.value)}
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
                        aria-labelledby='Segundo Nome do Resp. pela Capa'
                        id='segundo_nome_pessoa'
                        type='text'
                        label='Segundo Nome'
                        helperText='Segundo Nome do Resp. pela Capa do Livro'
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        onChange={(e)=> setMiddleName(e.target.value)}
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
                        aria-labelledby='Sobrenome do Resp. pela Capa'
                        id='ultimo_nome_pessoa'
                        type='text'
                        label='Sobrenome Nome'
                        helperText='Sobrenome do Resp. pela Capa do Livro'
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        onChange={(e)=> setLastName(e.target.value)}
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
                        helperText='Data de Cadastro do Resp. pela Capa'
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
                        getOptionSelected={(o,v) =>  (o.option === v.value)}
                        getOptionLabel={(o) => o.nome}
                        onChange={(e,v) => setPaisCover(!v? '' : v.id)}
                        options={arrayPaises} 
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                type='text'
                                helperText='País de Nacionalidade do Resp. pela Capa'
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
                        onChange={(e,v) => setGraduacaoCover(v === '' ? '' : v)}
                        options={arrayGraduacao} 
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                type='text'
                                helperText='Graduação do Resp. pela Capa'
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
                        helperText={(numCPF.length === 0 ? 'Número do CPF do Resp. pela Capa' : (((numCPF.length > 0) && (numCPF.length < 11)) ? 'Informe o Número Completo do CPF' : ( ValidatingCPF(numCPF) ? 'Número do CPF do Resp. pela Capa' : 'CPF Inválido' )))}
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
                            Sexo do Resp. pela Capa
                        </FormLabel>
                        <RadioGroup 
                            row
                            aria-label='Sexo Autor'
                            name='sexo_pessoas'
                            defaultValue='M'
                            onChange={(e) => setSexoCover(e.target.value)}
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
                            Raça do Resp. pela Capa
                        </FormLabel>
                        <RadioGroup 
                            row
                            aria-label='Raça do Resp. pela Capa'
                            name='raca_pessoas'
                            defaultValue='P'
                            onChange={(e) => setRacaCover(e.target.value)}
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
                        startIcon={<Save/>}
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
};