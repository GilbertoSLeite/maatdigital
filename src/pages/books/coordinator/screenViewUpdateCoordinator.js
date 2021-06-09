import React from "react";
import PropTypes from 'prop-types';
import { CssBaseline, FormControl, FormControlLabel, FormLabel, Grid,  makeStyles, Paper, Radio, RadioGroup, TextField } from "@material-ui/core";
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
    grid:{
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
}));

export default function ScreenUpdateViewCoordinator(props) {
    const{fNomeIn, mNomeIn, lNomeIn, paisIn, graduacaoIn, cpfIn, sexoIn, racaIn, statusIn} = props    
    const classes = useStyles()
    const [arrayPaises, setArrayPaises] = React.useState([])
    const [arrayGraduacao, setArrayGraduacao] = React.useState([])   

    React.useEffect(() => {
        (async () => setArrayPaises(await SearchPaises()))()
    },[]);

    React.useEffect(() => {
        (async () => setArrayGraduacao(await SearchGraduation()))()
    },[]);

    const RetornarNomePais = (identificado) => {
        let nomePais = arrayPaises.find(paises => (paises.id ===identificado ))
        return (nomePais && nomePais.nome)
    };

    const RetornarGraduacao = (identificado) => {
        let nomeGraduacao = ''; 
        for(const dados of identificado){
            let graduacaoDados = arrayGraduacao.find(graduacao => (graduacao.id === dados))
            nomeGraduacao += (graduacaoDados && graduacaoDados.nome_graduacao) + ' '
        }
        return nomeGraduacao
    }; 
    
    return(
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
                        aria-labelledby='Segundo Nome do Coordenador'
                        id='segundo_nome_pessoa'
                        type='text'
                        helperText='Segundo Nome do Coordenador do Livro'
                        variant='outlined'
                        margin='dense'
                        value={mNomeIn}
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
                    <TextField
                        aria-labelledby='Sobrenome do Coordenador'
                        id='ultimo_nome_pessoa'
                        type='text'
                        helperText='Sobrenome do Coordenador do Livro'
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
                        helperText='País de Nacionalidade do Coordenador'
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
                        helperText='Graduação do Coordenador'
                        variant='outlined'
                        margin='dense'
                        value={(RetornarGraduacao(graduacaoIn) !== undefined && RetornarGraduacao(graduacaoIn))}
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
                        helperText='Documento de CPF do Coordenador do Livro'
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
                            Sexo do Coordenador
                        </FormLabel>
                        <RadioGroup 
                            row
                            aria-label='Sexo Autor'
                            name='sexo_pessoas'
                            value={sexoIn}
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
                            value={racaIn}
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
                    <TextField
                        type='text'
                        helperText='Status do Cadastro do Coordenador'
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
};

ScreenUpdateViewCoordinator.propTypes = {
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