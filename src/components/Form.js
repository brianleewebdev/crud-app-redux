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
            isLoaded: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        if (e.target.id === 'states') {
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
            gross_annual_income,
            currentId
        } = this.state
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

    render() {
        if (this.state.isLoaded === true) {
            return (
                <Form>
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
                                value={this.state.first_name}
                            />
                            <FormInput
                                label="Last Name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                required
                                className="input text last-name"
                                onChange={this.handleInputChange}
                                value={this.state.last_name}
                            />
                            <FormInput
                                label="Address (No P.O. Boxes)"
                                name="address"
                                type="text"
                                placeholder="Street"
                                required
                                className="input text address"
                                onChange={this.handleInputChange}
                                value={this.state.address}
                            />
                            <FormInput
                                label="City"
                                name="city"
                                type="text"
                                placeholder="City"
                                required
                                className="input text state"
                                onChange={this.handleInputChange}
                                value={this.state.city}
                            />
                            <States name={'states'} onChange={this.handleInputChange} value={this.state.state} />
                            <FormInput
                                label="Zip"
                                name="zip"
                                type="text"
                                placeholder="Zip"
                                required
                                className="input text zip"
                                onChange={this.handleInputChange}
                                value={this.state.zip}
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
                                value={this.state.phone}
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                className="input email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
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
                                value={this.state.dob_month}
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
                                value={this.state.dob_day}
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
                                value={this.state.dob_year}
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
                                value={this.state.social_security}
                            />
                            <FormInput
                                label="Pre-tax annual income"
                                name="gross_annual_income"
                                type="nutextmber"
                                placeholder="Income"
                                required
                                className="input text gross-annual-income"
                                onChange={this.handleInputChange}
                                value={this.state.gross_annual_income}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" size="lg" type="submit" onClick={this.handleSubmit}>
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
