import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Label from 'react-bootstrap/FormLabel';
import logo from '../assets/img/ff-loading-icon-copy.png';
import { connect } from 'react-redux';
import { addApplication, updateApplication } from '../redux/actions';

import FormInput from './InputField';
import States from './States';

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
            gross_annual_income: '',
            currentId: '',
            isLoaded: false,
            errors: undefined
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
    }

    componentDidMount = () => {
        this.setState({ isLoaded: true })
        if (this.props.applications.some(a => a.id === this.props.currentAppId)) {
            let currentApp = this.props.applications.filter(a => a.id === this.props.currentAppId)
            currentApp.map(a =>
                this.setState({
                    first_name: a.entry.first_name,
                    last_name: a.entry.last_name,
                    address: a.entry.address,
                    city: a.entry.city,
                    state: a.entry.state,
                    zip: a.entry.zip,
                    phone: a.entry.phone,
                    email: a.entry.email,
                    dob_day: a.entry.dob_day,
                    dob_month: a.entry.dob_month,
                    dob_year: a.entry.dob_year,
                    social_security: a.entry.social_security,
                    gross_annual_income: a.entry.gross_annual_income,
                    currentId: a.id
                })
            )
        }
    }

    handleInputChange = e => {
        let key = ''
        e.target.id === 'state' ? key='state' : key = e.target.name
        const value = e.target.value
        
        this.setState({
            [key]: value
        })
    }

    handleValidation = () => {
        let errors = {}
        let formValid = true

        if (this.state.first_name === '') {
            errors['first_name'] = "What's your name?"
            formValid = false
        } else {
            if(!this.state.first_name.match(/^[a-zA-Z]+$/)) {
                errors['first_name'] = 'Only letters'
                formValid = false
            }
        }
        
        if (this.state.last_name === '') {
            errors['last_name'] = 'How about your last name?'
            formValid = false
        } else {
            if(!this.state.last_name.match(/^[a-zA-Z]+$/)) {
                errors['last_name'] = 'Only letters'
                formValid = false
            }
        }

        if (this.state.address === '') {
            errors['address'] = 'You forgot to fill out your address!'
            formValid = false
        }

        if (this.state.city === '') {
            errors['city'] = 'Which city do you live in?'
            formValid = false
        } else {
            if(!this.state.city.match(/^[a-zA-Z\s]+$/)) {
                errors['city'] = 'Only letters'
                formValid = false
            }
        }

        if (this.state.state === '') {
            errors['state'] = 'Please choose the state you reside in.'
            formValid = false
        } 

        if (this.state.zip === '') {
            errors['zip'] = 'Please provide your zip code.'
            formValid = false
        }  else {
            if(!this.state.zip.match(/^[0-9\b]+$/)) {
                errors['zip'] = 'Numbers only'
                formValid = false
            }
        }

        if (this.state.phone === '') {
            errors['phone'] = 'What if we need to contact you?'
            formValid = false
        }

        if (this.state.email === '') {
            errors['email'] = 'We require an email address!'
            formValid = false
        }

        if (this.state.dob_month === '' || this.state.dob_day === '' || this.state.dob_year === '') {
            errors['dob'] = 'Please provide your birth date.'
            formValid = false
        } else {
            if(!this.state.dob_month.match(/^[0-9\b]+$/) || !this.state.dob_day.match(/^[0-9\b]+$/) || !this.state.dob_year.match(/^[0-9\b]+$/)) {
                errors['dob'] = 'Numbers only'
                formValid = false
            }
        }

        if (this.state.social_security === '') {
            errors['social_security'] = 'Please provide the last four digits of your Social Security.'
            formValid = false
        } else {
            if(!this.state.social_security.match(/^[0-9\b]+$/)) {
                errors['social_security'] = 'Numbers only'
                formValid = false
            }
        }

        if (this.state.gross_annual_income === '') {
            errors['gross_annual_income'] = 'Please provide your pre-tax annual income.'
            formValid = false
        } else {
            if(!this.state.gross_annual_income.match(/^[-,0-9]+$/)) {
                errors['gross_annual_income'] = 'Numbers only'
                formValid = false
            }
        }

        this.setState({ errors: errors })
        return formValid
    }

    handleSubmit = e => {
        e.preventDefault()
        this.handleValidation()
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
            currentId
        } = this.state
        if (this.handleValidation()) {
            if (this.props.applications.some(a => a.id === this.props.currentAppId)) {
                this.props.updateApplication({
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
                    currentId
                })
            } else {
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
            this.props.toggleLoaded()
        }
    }

    render() {
        if (this.state.isLoaded === true) {
            return (
                <Form className='loan-application-form'>
                    <Row>
                        <Col>
                            <FormInput
                                label="First Name"
                                name="first_name"
                                type="text"
                                placeholder="John"
                                required
                                className='first_name'
                                onChange={this.handleInputChange}
                                value={this.state.first_name}
                                error={this.state.errors}
                                errorClass={'first_name'}
                            />
                            <FormInput
                                label="Last Name"
                                name="last_name"
                                type="text"
                                placeholder="Doe"
                                required
                                className='last_name'
                                onChange={this.handleInputChange}
                                value={this.state.last_name}
                                error={this.state.errors}
                                errorClass={'last_name'}
                            />
                            <FormInput
                                label="Address (No P.O. Boxes)"
                                name="address"
                                type="text"
                                required
                                className='address'
                                onChange={this.handleInputChange}
                                value={this.state.address}
                                error={this.state.errors}
                                errorClass={'address'}
                            />
                            <FormInput
                                label="City"
                                name="city"
                                type="text"
                                required
                                className='city'
                                onChange={this.handleInputChange}
                                value={this.state.city}
                                error={this.state.errors}
                                errorClass={'city'}
                            />
                            <States
                                name={'state'}
                                className='select states'
                                onChange={this.handleInputChange}
                                value={this.state.state}
                                error={this.state.errors}
                                errorClass={'state'}
                            />
                            <FormInput
                                label="Zip"
                                name="zip"
                                type="text"
                                required
                                className='zip'
                                onChange={this.handleInputChange}
                                value={this.state.zip}
                                error={this.state.errors}
                                errorClass={'zip'}
                            />
                            <FormInput
                                label="Phone"
                                name="phone"
                                type="tel"
                                required
                                className='phone'
                                onChange={this.handleInputChange}
                                value={this.state.phone}
                                error={this.state.errors}
                                errorClass={'phone'}
                                strlimit='10'
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="johndoe@freedomforever.com"
                                required
                                className='email'
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                error={this.state.errors}
                                errorClass={'email'}
                            />
                            <Label>Date of Birth</Label>
                            {this.state.errors ?
                                Object.entries(this.state.errors).map(([k, v], index) =>
                                    k === 'dob' ? 
                                        <span className='error' key={index}>{v}</span> 
                                        : null
                                )
                                : null
                            }
                            <FormInput
                                label="Month"
                                name="dob_month"
                                type="text"
                                required
                                className='dob-month'
                                onChange={this.handleInputChange}
                                strlimit='2'
                                value={this.state.dob_month}
                                error={this.state.errors}
                                errorClass={'dob'}
                            />
                            <FormInput
                                label="Day"
                                name="dob_day"
                                type="text"
                                required
                                className='dob-day'
                                onChange={this.handleInputChange}
                                strlimit='2'
                                value={this.state.dob_day}
                                error={this.state.errors}
                                errorClass={'dob'}
                            />
                            <FormInput
                                label="Year"
                                name="dob_year"
                                type="text"
                                required
                                className='dob-year'
                                onChange={this.handleInputChange}
                                strlimit='4'
                                value={this.state.dob_year}
                                error={this.state.errors}
                                errorClass={'dob'}
                            />
                            <FormInput
                                label="Social Security (last 4 digits)"
                                name="social_security"
                                type="text"
                                required
                                className='social-security'
                                onChange={this.handleInputChange}
                                strlimit='4'
                                value={this.state.social_security}
                                error={this.state.errors}
                                errorClass={'social_security'}
                            />
                            <FormInput
                                label="Pre-tax annual income"
                                name="gross_annual_income"
                                type="nutextmber"
                                required
                                className='gross-annual-income'
                                onChange={this.handleInputChange}
                                value={this.state.gross_annual_income}
                                error={this.state.errors}
                                errorClass={'gross_annual_income'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button size="lg" type="submit" className='submit' onClick={e => this.handleSubmit(e)} block>
                                {
                                    this.props.applications.some(a => a.id === this.props.currentAppId) ?
                                        'Edit Application'
                                        :
                                        'Submit Application'
                                }
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )
        } else {
            return (
                <Row>
                    <Col>
                        <div className="loading">
                            <div className="loading-icon-wrapper">
                                <img className="loading-icon animate-flicker" src={logo} alt="Please wait while we fetch your data!" />
                            </div>
                            <span>loading...</span>
                        </div>
                    </Col>
                </Row>
            )
        }
    }
}

const mapStateToProps = state => {
    return { applications: state.applications }
}

const mapDispatchToProps = dispatch => {
    return {
        addApplication: application => dispatch(addApplication(application)),
        updateApplication: application => dispatch(updateApplication(application))
    }
}

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanForm);

export default ConnectedForm;
