import React from 'react';
import {
    Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const SnackMAAT = (props) => {

    const { open, close, textSnack, handleClose, alert } = props;

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
                    severity={alert ? alert : 'success'}
                    action={handleClose}
                >
                    {textSnack}
                </Alert>
            </Snackbar>
        </div>
    );
}

SnackMAAT.propTypes = {
    open: PropTypes.bool.isRequired,
    textSnack: PropTypes.string.isRequired,
    handleClose: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    alert: PropTypes.string
};

export default SnackMAAT;