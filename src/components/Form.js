import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Label from 'react-bootstrap/FormLabel';
import {connect} from 'react-redux';
import {addApplication} from '../redux/actions';

import FormInput from './InputField';
import States from './States';

const mapDispatchToProps = dispatch => {
    return {
        addApplication: application => dispatch(addApplication(application))
    }
}

class LoanForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            email: '',
            dob_day: '',
            dob_month: '',
            dob_year: '',
            social_security: '',
            gross_annual_income: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange = e => {
        let key = ''
        if(e.target.id === 'states') {
            key = 'state'
        } else {
            key = e.target.name
        }
        const value = e.target.value
        this.setState({
            [key]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const {
            first_name,
            last_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            dob_day,
            dob_month,
            dob_year,
            social_security,
            gross_annual_income
        } = this.state
        this.props.addApplication({
            first_name,
            last_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            dob_day,
            dob_month,
            dob_year,
            social_security,
            gross_annual_income
        })
    }

    render() {
        const {
            first_name,
            last_name,
            address,
            city,
            state,
            zip,
            phone,
            email,
            dob_day,
            dob_month,
            dob_year,
            social_security,
            gross_annual_income,
        } = this.state
        return (
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <FormInput
                                label="First Name"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                required
                                className="input text mb-3 first-name"
                                onChange={this.handleInputChange}
                                value={first_name}
                            />
                            <FormInput
                                label="Last Name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                required
                                className="input text last-name"
                                onChange={this.handleInputChange}
                                value={last_name}
                            />
                            <FormInput
                                label="Address (No P.O. Boxes)"
                                name="address"
                                type="text"
                                placeholder="Street"
                                required
                                className="input text address"
                                onChange={this.handleInputChange}
                                value={address}
                            />
                            <FormInput
                                label="City"
                                name="city"
                                type="text"
                                placeholder="City"
                                required
                                className="input text state"
                                onChange={this.handleInputChange}
                                value={city}
                            />
                            <States onChange={this.handleInputChange} value={state} />
                            <FormInput
                                label="Zip"
                                name="zip"
                                type="text"
                                placeholder="Zip"
                                required
                                className="input text zip"
                                onChange={this.handleInputChange}
                                value={zip}
                            />
                        </Col>
                        <Col>
                            <FormInput
                                label="Phone"
                                name="phone"
                                type="text"
                                placeholder="Phone"
                                required
                                className="input text phone"
                                onChange={this.handleInputChange}
                                value={phone}
                            />
                            <FormInput 
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                className="input email"
                                onChange={this.handleInputChange}
                                value={email}
                            />
                            <Label>Date of Birth</Label>
                            <FormInput
                                label="Month"
                                name="dob_month"
                                type="text"
                                placeholder="Month"
                                required
                                className="input text dob-month"
                                onChange={this.handleInputChange}
                                strlimit='2'
                                value={dob_month}
                            />
                            <FormInput
                                label="Day"
                                name="dob_day"
                                type="text"
                                placeholder="Day"
                                required
                                className="input text dob-day"
                                onChange={this.handleInputChange}
                                strlimit='2'
                                value={dob_day}
                            />
                            <FormInput
                                label="Year"
                                name="dob_year"
                                type="text"
                                placeholder="Year"
                                required
                                className="input text dob-year"
                                onChange={this.handleInputChange}
                                strlimit='4'
                                value={dob_year}
                            />
                            <FormInput
                                label="Last 4 digits of your Social Security"
                                name="social_security"
                                type="text"
                                placeholder="XXXX"
                                required
                                className="input text social-security"
                                onChange={this.handleInputChange}
                                strlimit='4'
                                value={social_security}
                            />
                            <FormInput
                                label="Pre-tax annual income"
                                name="gross_annual_income"
                                type="nutextmber"
                                placeholder="Income"
                                required
                                className="input text gross-annual-income"
                                onChange={this.handleInputChange}
                                value={gross_annual_income}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" size="lg" type="submit" onClick={this.handleSubmit}>Submit Application</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        )
    }
}

const ConnectedForm = connect(
    null,
    mapDispatchToProps
)(LoanForm);

export default ConnectedForm;
