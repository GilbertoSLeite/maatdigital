import React from "react";
import { Button, makeStyles, Paper } from "@material-ui/core";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import { Add } from "@material-ui/icons";
import TableOrganizer from "./tableOrganizer";
import ScreenRegisterOrganizer from "./screenRegisterOrganizer";

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

const TelaOrganizador = () => {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    return (
        <div>
            {statusTela ?
                <div>
                    <TableOrganizer />
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
                            Inserir Organizador
                        </Button>
                    </Paper>
                    {abrirDialog ?
                        <DialogCadastro
                            openDialog={abrirDialog}
                            closeDialog={handleFecharDialog}
                            titleDialog={"Cadastro do Organizador"}
                            telaDialog={<ScreenRegisterOrganizer />}
                        /> :
                        null}
                </div> :
                <div>
                    <TableOrganizer />
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
                            Inserir Organizador
                        </Button>
                    </Paper>
                </div>}
        </div>
    );
}

export default TelaOrganizador;