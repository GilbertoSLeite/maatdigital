import React from 'react';
import { Button, makeStyles, Paper } from '@material-ui/core';
import TableBooks from './tableBooks';
import { Add } from '@material-ui/icons';
import DialogCadastro from '../../../components/dialog/dialogCadastro/dialogCadastro';
import ScreenRegisterBook from './screenRegisterBook';

const useStyles = makeStyles((theme) =>({
    button: {
        color: '#5890a6',
        fontWeight: 'bold'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
}));

export default function TelaLivros(){
    const classes = useStyles();
    const [statusTela, setStatusTelas] = React.useState(false);
    const [abrirDialog, setAbrirDialog] = React.useState(false);

    const handleInsertUpdate = () => setStatusTelas(true) || setAbrirDialog(true)  

    const handleFecharDialog = () => setAbrirDialog(false) || window.location.reload() 

    return(
        <div>
            {
                statusTela ?
                <div>
                    <TableBooks />
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Button
                                className={classes.button}
                                onClick={handleInsertUpdate}
                                size='large'
                                variant='outlined'
                                startIcon={<Add />}
                                fullWidth
                            >
                                Inserir Livro
                            </Button>
                        </Paper>
                        {abrirDialog &&
                            <DialogCadastro
                                openDialog={abrirDialog}
                                closeDialog={handleFecharDialog}
                                titleDialog='Cadastro do Livro'
                                telaDialog={<ScreenRegisterBook />}
                            />
                        }
                </div> :
                <div> 
                    <TableBooks />
                        <Paper
                            elevation={8}
                            variant='elevation'
                            className={classes.paper}
                        >
                            <Button
                                className={classes.button}
                                onClick={handleInsertUpdate}
                                size='large'
                                variant='outlined'
                                startIcon={<Add />}
                                fullWidth
                            >
                                Inserir Livro
                            </Button>
                        </Paper>
                </div>
            }
        </div>
    );
};