import React from "react";
import {  Button, makeStyles, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import RegistreGraduation from "./registregraduation";
import DialogCadastro from "../../../componets/dialog/dialogCadastro/dialogCadastro";
import TableGraduation from "./tablegraduation";

const useStyles = makeStyles(() => ({
        button: {
            color: '#5890a6',
            fontWeight: 'bold'
        },
    }));

export default function TelaGraduacao() {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)  

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    return(
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
                titleDialog={"Cadastro do Bairro"}  
                telaDialog={<RegistreGraduation/>}
            />: 
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
};