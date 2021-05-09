import React from "react";
import { Button, makeStyles, Paper } from "@material-ui/core";
import DialogCadastro from "../../../components/dialog/dialogCadastro/dialogCadastro";
import { Add } from "@material-ui/icons";
import TableCover from "./tableCover";
import ScreenRegisterCover from "./screenRegisterCover";

const useStyles = makeStyles((theme) => ({
    button: {
        color: '#5890a6',
        fontWeight: 'bold'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
}));

export default  function TelaRespCapa() {
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)  

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload()
    return(
        <div>
        {statusTela ? 
        <div>
        <TableCover />
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
                Inserir do Resp. pela Capa
            </Button>
        </Paper>
        {abrirDialog ? 
            <DialogCadastro
                openDialog={abrirDialog}
                closeDialog={handleFecharDialog} 
                titleDialog={"Cadastro do Resp. da Capa"}  
                telaDialog={<ScreenRegisterCover />}
            />: 
            null}
        </div> : 
        <div>
        <TableCover />
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
                    Inserir do Resp. pela Capa
                </Button>
        </Paper>
        </div>}
        </div>
    );
};