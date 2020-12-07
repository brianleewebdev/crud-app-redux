import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    label,
    strlimit,
    ...props
}) => {
    return (
        <Form.Group controlId={name}>
            {error && <p>{error}</p>}
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                name={name} 
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
                style={error && { border: 'solid 1px red' }}
                maxLength={strlimit}
            />
        </Form.Group>
    )
}

FormInput.defaultProps = {
    type: 'text',
    classname: ''
}
FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default FormInput;