import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const TextFieldCEP = (props) => {
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
            format="##.###-###"
        />
    );
}

TextFieldCEP.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextFieldCEP;