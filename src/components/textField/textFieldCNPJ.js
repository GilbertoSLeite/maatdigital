import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default function TextFieldCNPJ(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            format="##.###.###/####-##"
        />
    );
};

TextFieldCNPJ.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};