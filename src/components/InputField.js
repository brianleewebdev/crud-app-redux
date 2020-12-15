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
    errorClass,
    ...props
}) => {
    return (
        <Form.Group controlId={name} className={name}>
            <Form.Label>{label}</Form.Label>
            {error ?
                Object.entries(error).map(([k, v], index) =>
                    k === name ? <span className='error' key={index}>{v}</span> : null
                )
                :
                null
            }
            <Form.Control
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${className} input`}
                style={error ? error[errorClass] ? {border: '1px solid red'} : null : null}
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
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default FormInput;