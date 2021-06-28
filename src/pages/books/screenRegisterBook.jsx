import React from "react";
import {
    Button,
    CssBaseline,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import {
    Close,
    CloudUploadOutlined,
    Save
} from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import {
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import SearchSubClasse from "../../functions/searchData/areaConhecimento/returnsubclasse";
import SearchPublisher from "../../functions/searchData/publisher/returnPublisher";
import SearchOrganizer from "../../functions/searchData/organizer/searchOrganizer";
import SearchEditor from "../../functions/searchData/editor/searchEditor";
import SearchCoordinator from "../../functions/searchData/coordinator/searchCoordinator";
import SearchCover from "../../functions/searchData/cover/searchCover";
import SearchDiagramming from "../../functions/searchData/diagramming/searchDiagramming";
import InsertBooks from "../../functions/register/books/insertBooks";
import SnackMAAT from "../../components/snackbar/snackbar";
import BooleanValidation from "../../functions/booleanValidation/booleanValidation";

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
    paperCover: {
        padding: theme.spacing(4),
        textAlign: 'center',
        height: '110px',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    grid: {
        marginTop: 1,
        width: "100%",
        alignItems: 'center',
    },
    button: {
        color: '#5890a6',
        fontWeight: 'bold',
        fontSize: 'large',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
}));

const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            text: {
                color: '#5890a6',
                fontWeight: 'bold',
                fontSize: 'large'
            },
        }
    }
});

const ScreenRegisterBook = () => {
    const classes = useStyles()
    const [arrayClassificao, setArrayClassificacao] = React.useState([])
    const [arrayEditora, setArrayEditora] = React.useState([])
    const [arrayOrganizador, setArrayOrgazinador] = React.useState([])
    const [arrayEditores, setArrayEditoresLivro] = React.useState([])
    const [arrayCoordenadores, setArrayCoordenadores] = React.useState([])
    const [arrayRespCapa, setArrayRespCapa] = React.useState([])
    const [arrayDiagramadores, setArrayDiagramadores] = React.useState([])
    const [imagemCapaLivro, setImagemCapaLivro] = React.useState()
    const [tituloLivro, setTituloLivro] = React.useState(null)
    const [subTituloLivro, setSubTituloLivro] = React.useState(null)
    const [classLivro, setClassLivro] = React.useState(null)
    const [isbnLivro, setIsbnLivro] = React.useState(null)
    const [linkLivro, setLinkLivro] = React.useState(null)
    const [editoraLivro, setEditoraLivro] = React.useState(null)
    const [organizadorLivro, setOrganizadorLivro] = React.useState([])
    const [editoresResp, setEditoresResp] = React.useState([])
    const [coordenadoresLivros, setCoordenadoresLivros] = React.useState([])
    const [respCapa, setRespCapa] = React.useState([])
    const [diagramadoresLivros, setDiagramadoresLivros] = React.useState([])
    const [resumoLivro, setResumoLivro] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const [openUpload, setOpenUpload] = React.useState(false)
    const [textSnackBar, setTextSnackbar] = React.useState('')
    const [alertSnack, setAlertSnack] = React.useState(null)
    const [disableButton, setDisableButton] = React.useState(false)

    const dataInsert = {
        "dataOrganizadorLivro": organizadorLivro,
        "dataEditoresResp": editoresResp,
        "dataCoordenadoresLivros": coordenadoresLivros,
        "dataDiagramadoresLivros": diagramadoresLivros,
        "dataCapaLivro": ((imagemCapaLivro !== undefined) ? imagemCapaLivro : []),
        "dataRespCapaLivro": respCapa,
        "dataTituloLivro": tituloLivro,
        "dataSubTituloLivro": subTituloLivro,
        "dataClassLivro": classLivro,
        "dataEditoraLivro": editoraLivro,
        "dataIsbnLivro": (isbnLivro && isbnLivro.replaceAll('-', '')),
        "dataLinkLivro": linkLivro,
        "dataResumoLivro": resumoLivro,
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
        setTextSnackbar('Dados Não Forma Inseridos - Verificar Console')
    };

    const HandleSubmit = async () => BooleanValidation[await InsertBooks(dataInsert)] ? trueInsert() : falseInsert()

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

    React.useEffect(() => {
        (async () => setArrayClassificacao(await SearchSubClasse()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayEditora(await SearchPublisher()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayOrgazinador(await SearchOrganizer()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayEditoresLivro(await SearchEditor()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayCoordenadores(await SearchCoordinator()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayRespCapa(await SearchCover()))();
    }, []);

    React.useEffect(() => {
        (async () => setArrayDiagramadores(await SearchDiagramming()))();
    }, []);

    const dropDialogClose = () => {
        setTimeout(() => {
            setOpenUpload(false)
        }, 1500);
    }

    const dropDialogOpen = () => {
        setOpenUpload(true);
        (imagemCapaLivro && setImagemCapaLivro(undefined));
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid
                    aria-label='Grade da Tela de Cadastro do Livro'
                    id="GridCadastroLivro"
                    container
                    spacing={2}
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    className={classes.grid}>
                    <Grid
                        item
                        xs={12}
                        sm={2}
                    >
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paperCover}
                        >
                            <Button
                                className={classes.button}
                                size='large'
                                variant='text'
                                startIcon={<CloudUploadOutlined />}
                                fullWidth
                                onClick={() => dropDialogOpen()}>
                                {imagemCapaLivro ? 'Enviado' : 'Capa'}
                            </Button>
                            <MuiThemeProvider theme={theme}>
                                <DropzoneDialog
                                    open={openUpload}
                                    acceptedFiles={['image/*']}
                                    onSave={(files) => {
                                        setImagemCapaLivro(files);
                                        dropDialogClose();
                                    }}
                                    showFileNamesInPreview={true}
                                    showPreviews={true}
                                    showPreviewsInDropzone={true}
                                    maxFileSize={50000000}
                                    filesLimit={1}
                                    dialogTitle='Imagem para Capa do Livro'
                                    submitButtonText='Enviar Arquivo'
                                    cancelButtonText='Cancelar Envio'
                                    previewText='Veja o Arquivo'
                                    dropzoneText='Arraste e solte um arquivo aqui ou clique'
                                    onClose={() => setOpenUpload(false)}
                                />
                            </MuiThemeProvider>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={5}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Título do Livro'
                                id='titulo_livro'
                                type='text'
                                label='Título do Livro'
                                helperText='Digite o Título do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setTituloLivro(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={5}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Subtítulo do Livro'
                                id='subtitulo_livro'
                                type='text'
                                label='Subtítulo do Livro'
                                helperText='Digite o Subtítulo do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setSubTituloLivro(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setClassLivro((!v ? '' : v.id))}
                                getOptionSelected={(o, v) => (o.option === v.value)}
                                getOptionLabel={(option) => (option.codigo_subclasses + ' - ' + option.tipo_subclasses)}
                                options={arrayClassificao}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Classificação do Livro'
                                        id='classificacao_id'
                                        type='text'
                                        label='Classificação do Livro'
                                        helperText='Escolha a Classificação do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setEditoraLivro((!v ? '' : v.id))}
                                getOptionSelected={(o, v) => (o.option === v.value)}
                                getOptionLabel={(option) => (option.nome_editora)}
                                options={arrayEditora}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Editora do Livro'
                                        id='editora_id'
                                        type='text'
                                        label='Editora do Livro'
                                        helperText='Escolha a Editora do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setOrganizadorLivro((!v ? '' : v))}
                                multiple
                                getOptionLabel={(option) => (option.primeiro_nome_pessoa + ' ' + option.ultimo_nome_pessoa)}
                                options={arrayOrganizador}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Organizadores do Livro'
                                        id='organizador_id'
                                        type='text'
                                        label='Organizadores do Livro'
                                        helperText='Escolha os Organizadores do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setEditoresResp((!v ? '' : v))}
                                multiple
                                getOptionLabel={(option) => (option.primeiro_nome_pessoa + ' ' + option.ultimo_nome_pessoa)}
                                options={arrayEditores}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Editor(es) Responsável do Livro'
                                        id='editores_id'
                                        type='text'
                                        label='Editor(es) Responsável do Livro'
                                        helperText='Escolha os Editor(es) Responsável do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setCoordenadoresLivros((!v ? '' : v))}
                                multiple
                                getOptionLabel={(option) => (option.primeiro_nome_pessoa + ' ' + option.ultimo_nome_pessoa)}
                                options={arrayCoordenadores}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Coordenador do Livro'
                                        id='coordenador_id'
                                        type='text'
                                        label='Coordenador(es) do Livro'
                                        helperText='Escolha o(s) Coordenador(es) do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setRespCapa((!v ? '' : v))}
                                multiple
                                getOptionLabel={(option) => (option.primeiro_nome_pessoa + ' ' + option.ultimo_nome_pessoa)}
                                options={arrayRespCapa}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Responsável pela Capa do Livro'
                                        id='capas_id'
                                        type='text'
                                        label='Responsável pela Capa do Livro'
                                        helperText='Responsável pela Capa do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Autocomplete
                                onChange={(e, v) => setDiagramadoresLivros((!v ? '' : v))}
                                multiple
                                getOptionLabel={(option) => (option.primeiro_nome_pessoa + ' ' + option.ultimo_nome_pessoa)}
                                options={arrayDiagramadores}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        aria-labelledby='Diagramador(es) do Livro'
                                        id='diagramador_id'
                                        type='text'
                                        label='Diagramador(es) do Livro'
                                        helperText='Escolha o(s) Diagramador(es) do Livro'
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
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='ISBN(International Standard Book Number  Padrão Internacional de Numeração de Livro)'
                                id='isbn_livro'
                                type='text'
                                label='ISBN do Livro'
                                helperText='ISBN(Padrão Internacional de Numeração de Livro)'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setIsbnLivro(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Link para Download do Livro'
                                id='link_livro'
                                type='text'
                                label='Link para Download do Livro'
                                helperText='Digite o Link para Download do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setLinkLivro(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <TextField
                                aria-labelledby='Resumo do Livro'
                                id='resumo_livro'
                                type='text'
                                label='Resumo do Livro'
                                helperText='Digite o Resumo do Livro'
                                variant='outlined'
                                margin='dense'
                                fullWidth
                                onChange={(e) => setResumoLivro(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}>
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Button
                                size='large'
                                variant='outlined'
                                startIcon={<Save />}
                                onClick={HandleSubmit}
                                disabled={disableButton}
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
                    alert={alertSnack}
                    handleClose={<HandleClose />}
                />}
        </React.Fragment>
    );
}

export default ScreenRegisterBook;