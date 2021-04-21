import React from "react";
import { Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from "@material-ui/core";
import SnackMAAT from "../../../componets/snackbar/snackbar";
import { Close, Save } from "@material-ui/icons";
import InsertPublisher from "../../../functions/register/publisher/insertPublisher";
import { Autocomplete } from "@material-ui/lab";
import SearchPaises from "../../../functions/searchData/countries/returnCountries";

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

export default function RegistrePublisher() {
    const classes = useStyles();
    const [arrayPaises, setArrayPaises ] = React.useState([])
    const [dataCadastro, setDataCadastro] = React.useState(dataFormatHoje)
    const [nomeEditora, setNomeEditora] = React.useState('')
    const [anoFundacao, setAnoFundacao] = React.useState('')
    const [paisSede, setPaisSede] = React.useState('')
    const [webSite, setWebSite] = React.useState('')
    const [buttonDisable, setDisableButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [textSnackBar, setTextSnackbar] = React.useState('');
    
    React.useEffect(() => {
        const RetornarPaises = async () => setArrayPaises(await SearchPaises())
        RetornarPaises()
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

    const HandleSubmit = async () => await InsertPublisher(dataCadastro, nomeEditora, anoFundacao, paisSede, webSite) ? setOpen(true) || setTextSnackbar('Dados Inseridos com Sucesso') || setDisableButton(true) : setOpen(true) || setTextSnackbar('Dados Não Forma Inseridos - Verificar Console');

    return(
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
            <Grid
                id="GridCadastroEditora"
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
                            type='date'
                            helperText='Data de Cadastro da Editora'
                            variant='outlined'
                            margin='dense'
                            value={dataCadastro}
                            disabled
                            fullWidth
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
                                onChange={(e) => setNomeEditora(e.target.value)}
                                fullWidth
                            />
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={4}
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
                                onChange={(e) => setAnoFundacao(e.target.value)}
                                fullWidth
                            />
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={4}
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
                                getOptionLabel={(o) => o.nome}
                                onChange={(e,v) => setPaisSede(!v? '' : v.id)}
                                options={arrayPaises} 
                                renderInput={(params) => 
                                    <TextField
                                        {...params}
                                        type='text'
                                        label='País de Fundação'
                                        helperText='Páis de Fundação da Editora'
                                        variant='outlined'
                                        margin='dense'
                                        fullWidth
                                    />}
                            />
                            
                        </Paper>    
                    </Tooltip>
                </Grid>
                <Grid
                    item 
                    xs={12} 
                    sm={4}
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
                                onChange={(e) => setWebSite(e.target.value)}
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
                            disabled={buttonDisable}
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
                    handleClose={<HandleClose />} 
                />} 
        </React.Fragment>       
    );
};