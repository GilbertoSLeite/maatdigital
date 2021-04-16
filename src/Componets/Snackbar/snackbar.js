import React from 'react';
import {
    Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

export default function SnackMAAT(props) {

    const { open, close, textSnack, handleClose } = props;

    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={
                    {
                        horizontal: 'center',
                        vertical: 'top'
                    }
                }
                autoHideDuration={6000}
                onClose={close}
            >
                <Alert
                    severity="success"
                    action={handleClose}
                >
                    {textSnack}
                </Alert>
            </Snackbar>
        </div>
    );
};

SnackMAAT.propTypes = {
    open: PropTypes.bool.isRequired,
    textSnack: PropTypes.string.isRequired,
    handleClose: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
};