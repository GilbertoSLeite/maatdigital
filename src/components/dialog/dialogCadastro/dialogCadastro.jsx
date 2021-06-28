import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Slide,
    Tooltip
} from '@material-ui/core';
import { CancelOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#4a8099',
    },
    button: {
        color: '#5890a6',
        fontWeight: 'bold'
    },
    tittleDialog: {
        textAlign: 'center',
        backgroundColor: '#4a8099',
        color: '#fff',
        fontWeight: 'bold'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCadastro = (props) => {
    const classes = useStyles();
    const { openDialog, closeDialog, titleDialog, telaDialog } = props;

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogActions>
                    <Tooltip
                        arrow
                        title='Ao clicar neste botão a tela de cadastro será fechada sem salvar nenhum dos dados inseridos.'
                    >
                        <Button
                            className={classes.button}
                            size='large'
                            variant='outlined'
                            onClick={closeDialog}
                            startIcon={<CancelOutlined />}
                            fullWidth
                        >
                            Fechar
                        </Button>
                    </Tooltip>
                </DialogActions>
                <DialogTitle
                    id="alert-dialog-slide-title"
                    className={classes.tittleDialog}
                >
                    {titleDialog}
                </DialogTitle>
                <DialogContent
                    className={classes.root}
                >
                    {telaDialog}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

DialogCadastro.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    titleDialog: PropTypes.string.isRequired,
    telaDialog: PropTypes.object.isRequired,
}

export default DialogCadastro;