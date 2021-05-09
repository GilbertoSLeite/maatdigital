import React from "react";
import {  Button, makeStyles, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import TablePuslisher from "./tablePublisher";
import RegisterPublisher from "./registerPublisher";

const useStyles = makeStyles(() => ({
        button: {
            color: '#5890a6',
            fontWeight: 'bold'
        },
    }));

export default function TelaEditora() {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)  

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()

    return(
        <div>
        {statusTela ? 
        <div>
        <TablePuslisher />
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
                    Inserir Editora
                </Button>
        </Paper>
        {abrirDialog ? 
            <DialogCadastro
                openDialog={abrirDialog}
                closeDialog={handleFecharDialog} 
                titleDialog={"Cadastro da Editora"}  
                telaDialog={<RegisterPublisher/>}
            />: 
            null}
        </div> : 
        <div>
        <TablePuslisher />
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
                    Inserir Editora
                </Button>
        </Paper>
        </div>}
        </div>
    );
};