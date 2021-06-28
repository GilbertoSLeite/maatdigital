import React from "react";
import { Button, makeStyles, Paper } from "@material-ui/core";
import TableAuthor from "./tableAuthor";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import ScreenRegisterAuthor from "./screenRegisterAuthor";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    button: {
        color: '#5890a6',
        fontWeight: 'bold',
        fontSize: 'large'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

const TelaAutor = () => {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () =>
        setStatusTelas(true) || setAbrirDialog(true)

    const handleFecharDialog = () =>
        setAbrirDialog(false) || window.location.reload()

    return (
        <div>
            {statusTela ?
                <div>
                    <TableAuthor />
                    <Paper
                        elevation={8}
                        variant='elevation'
                        className={classes.paper}>
                        <Button
                            className={classes.button}
                            onClick={handleInsertUpdate}
                            size='large'
                            variant='outlined'
                            startIcon={<Add />}
                            fullWidth
                        >
                            Inserir Autor
                        </Button>
                    </Paper>
                    {abrirDialog ?
                        <DialogCadastro
                            openDialog={abrirDialog}
                            closeDialog={handleFecharDialog}
                            titleDialog={"Cadastro do Autor"}
                            telaDialog={<ScreenRegisterAuthor />}
                        /> :
                        null}
                </div> :
                <div>
                    <TableAuthor />
                    <Paper
                        elevation={8}
                        variant='elevation'
                        className={classes.paper}>
                        <Button
                            className={classes.button}
                            onClick={handleInsertUpdate}
                            size='large'
                            variant='outlined'
                            startIcon={<Add />}
                            fullWidth
                        >
                            Inserir Autor
                        </Button>
                    </Paper>
                </div>}
        </div>
    );
}

export default TelaAutor;