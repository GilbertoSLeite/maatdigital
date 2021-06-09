import React from "react";
import PropTypes from 'prop-types';
import { Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from "@material-ui/core";
import SnackMAAT from "../../../components/snackbar/snackbar";
import { Close, Save } from "@material-ui/icons";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";
import UpdatePublisher from "../../../functions/register/publisher/updatePublisher";
import { Autocomplete } from "@material-ui/lab";

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

export default function UpdateScreenPublisher(props) {
    const {identificadorIn, dataCadastroIn, nomeEditoraIn, anoFundacaoIn, paisSedeIn, webSiteIn, statusEditoraIn} = props;
    const classes = useStyles();
    const [arrayPaises, setArrayPaises ] = React.useState([])
    const [dataCadastro, setDataCadastro] = React.useState('')
    const [nomeEditora, setNomeEditora] = React.useState('')
    const [anoFundacao, setAnoFundacao] = React.useState('')
    const [paisSede, setPaisSede] = React.useState('')
    const [webSite, setWebSite] = React.useState('')
    const [newStatusEditor, setNewStatusEditora] = React.useState(false)
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [textSnackBar, setTextSnackbar] = React.useState('');
    const [alertSnack, setAlertSnack] = React.useState(null);
    const [edicao, setEdicao] = React.useState(false);

    React.useEffect(() => {
        (async () => setArrayPaises(await SearchPaises()))();
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
    
    const HandleSubmit = async () => await UpdatePublisher(identificadorIn, dataCadastro, nomeEditora, anoFundacao, paisSede, webSite, newStatusEditor) ? trueInsert()  : falseInsert();
    
    function RetornarNomePais(identificado){
        const paisesMundo = arrayPaises.find(paises => (paises.id === identificado))
        return ((paisesMundo !== undefined) && paisesMundo.nome)
    };
    
    return(
    <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
            <Grid
                id="GridAtualizarEditora"
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
                            aria-labelledby='Data de Cadastro'
                            id='data_cadastro'
                            type='text'
                            label='Data de Cadastro'
                            helperText='Data de Cadastro da Editora'
                            variant='outlined'
                            margin='dense'
                            value={dataCadastroIn}
                            onChange={(e) => setDataCadastro(e.target.value)}
                            fullWidth
                            disable
                        />
                    </Paper> 
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={8}
                >
                    <Tooltip 
                    arrow 
                    title='Digite o Nome da Editora que Será Vinculada ao Autor do Livro'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Nome da Editora'
                                id='nome_editora'
                                type='text'
                                label='Nome da Editora'
                                helperText='Editora do Livro do Autor'
                                variant='outlined'
                                margin='dense'
                                value={edicao ? null : nomeEditoraIn}
                                onChange={(e) => setNomeEditora(e.target.value)}
                                onClick={() => setEdicao(true)}
                                fullWidth
                            />
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={3}
                >
                    <Tooltip 
                    arrow 
                    title='Digite o Ano da Fundação da Editora'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Ano de Fundação'
                                id='ano_fundacao'
                                type='number'
                                label='Ano de Fundação'
                                helperText='Ano de Fundação da Editora'
                                variant='outlined'
                                margin='dense'
                                value={edicao ? null : anoFundacaoIn}
                                onChange={(e) => setAnoFundacao(e.target.value)}
                                onClick={() => setEdicao(true)}
                                fullWidth
                            />
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={3}
                >
                    <Tooltip 
                    arrow 
                    title='Escolha o País de Fundação da Editora'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >   
                            <Autocomplete
                                getOptionSelected={(o,v) =>  (o.option === v.value)}
                                inputValue={RetornarNomePais(paisSedeIn)}
                                getOptionLabel={(o) => o.nome}
                                onChange={(v) => setPaisSede(!v? '' : v.id)}
                                options={arrayPaises} 
                                renderInput={(params) => 
                                    <TextField
                                        {...params}
                                        type='text'
                                        label='País de Fundação'
                                        helperText='País de Fundação da Editora'
                                        variant='outlined'
                                        margin='dense'
                                        onClick={() => setEdicao(true)}
                                        fullWidth
                                    />}
                            />                            
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={3}
                >
                    <Tooltip 
                    arrow 
                    title='Status do Cadastro da Editora no Sistema'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >   
                            <Autocomplete
                                getOptionSelected={(o,v) =>  (o.option === v.value)}
                                inputValue={statusEditoraIn ? 'Ativo' : 'Inativo'}
                                getOptionLabel={(o) => o.value}
                                onChange={(v) => setNewStatusEditora(!v? '' : v.id)}
                                options={statusEditora} 
                                renderInput={(params) => 
                                    <TextField
                                        {...params}
                                        type='text'
                                        helperText='Status da Editora no Sistema'
                                        variant='outlined'
                                        margin='dense'
                                        onClick={() => setEdicao(true)}
                                        fullWidth
                                    />}
                            />                            
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={3}
                >
                    <Tooltip 
                    arrow 
                    title='Digite o Website da Editora'
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Website da Editora'
                                id='website_editora'
                                type='text'
                                label='Website da Editora'
                                helperText='Website da Editora'
                                variant='outlined'
                                margin='dense'
                                value={edicao? null : webSiteIn}
                                onChange={(e) => setWebSite(e.target.value)}
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
                        aria-labelledby='Balão do Botão para Salvar'
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
                            startIcon={<Save/>}
                            disabled={(dataCadastro === '' || nomeEditora === '' || anoFundacao === '' || paisSede === '' || webSite === '') ? true : buttonDisable}
                            onClick={HandleSubmit}
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
};

const statusEditora = [
    {
        "id": true,
        "value": 'Ativo'
    }, 
    {
        "id": false,
        "value": 'Inativo'
    }
];

UpdateScreenPublisher.propTypes = {
    identificadorIn: PropTypes.string.isRequired,
    dataCadastroIn: PropTypes.string.isRequired, 
    nomeEditoraIn: PropTypes.string.isRequired, 
    anoFundacaoIn: PropTypes.string.isRequired, 
    paisSedeIn: PropTypes.string.isRequired,
    webSiteIn: PropTypes.string.isRequired,
    statusEditoraIn: PropTypes.bool.isRequired,
};