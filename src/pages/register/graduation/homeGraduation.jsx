import React from "react";
import { Button, makeStyles, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import RegisterGraduation from "./registerGraduation";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import TableGraduation from "./tableGraduation";

const useStyles = makeStyles(() => ({
    button: {
        color: '#5890a6',
        fontWeight: 'bold'
    },
}));

const TelaGraduacao = () => {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    return (
        <div>
            {statusTela ?
                <div>
                    <TableGraduation />
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
                            Inserir Graduação
                        </Button>
                    </Paper>
                    {abrirDialog ?
                        <DialogCadastro
                            openDialog={abrirDialog}
                            closeDialog={handleFecharDialog}
                            titleDialog="Cadastro da Graduação"
                            telaDialog={<RegisterGraduation />}
                        /> :
                        null}
                </div> :
                <div>
                    <TableGraduation />
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
                            Inserir Graduação
                        </Button>
                    </Paper>
                </div>}
        </div>
    );
}

export default TelaGraduacao;