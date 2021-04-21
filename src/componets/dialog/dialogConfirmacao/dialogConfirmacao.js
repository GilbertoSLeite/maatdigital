import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function ConfirmDialog(props){
    const {openDialog, closeDialog, titleDialog, funcSim, funcNao} = props;
    
    return(
        <React.Fragment>
            <Dialog
                open={openDialog}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {titleDialog}
                </DialogTitle>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={funcSim}
                    >
                        SIM
                    </Button>
                    <Button
                        onClick={funcNao}
                        autoFocus
                    >
                        NÃO
                    </Button>
                </DialogActions>
            </Dialog>   
        </React.Fragment>
    );
};

ConfirmDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    titleDialog: PropTypes.string,
    funcSim: PropTypes.func,
    funcNao: PropTypes.func,
}