import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from '../assets/img/ff-loading-icon-copy.png';
import styles from '../css/module/list_applications.module.scss';
import { deleteApplication } from '../redux/actions';
import Search from './Search';

const mapStateToProps = state => {
    return { applications: state.applications }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteApplication: application => dispatch(deleteApplication(application))
    }
}

const ConnectedList = (props) => {
    //console.log(props)
    if (props) {
        let currentMappedEntry = []
        // if the results array is populated, map the results array else map global store
        props.results.length !== 0 ? currentMappedEntry = props.results : currentMappedEntry = props.applications
        return (
            <Col>
                <h1>Your Current Loan Applications</h1>
                <Search 
                    handleSearch={props.handleSearch}
                />
                {props.searchTextMatch === false ? 
                <div className={styles.noMatchingTerm}>
                    <h2>We couldn't find any matching applications!</h2>
                </div>
                :
                currentMappedEntry.map((app, index) =>
                    <div className={styles.listApplications} key={index}>
                        <div className={styles.listApplicationsHeader}>
                            <h2>{`Application ID: ${app.id}`}</h2>
                            <div className={styles.date}>Applied on {app.timestamp}</div>
                        </div>
                        <div className={styles.listWrapper}>
                            <Row>
                                <Col>
                                    <div className={styles.field}>{`Name: ${app.entry.first_name} ${app.entry.last_name}`}</div>
                                    <div className={styles.field}>{`Phone: ${app.entry.phone}`}</div>
                                    <div className={styles.field}>{`Email: ${app.entry.email}`}</div>
                                    <div className={styles.field}>
                                        <span>{`Address: ${app.entry.address} ${app.entry.city} ${app.entry.state} ${app.entry.zip}`}</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={styles.field}>
                                        <span>{`Date of Birth: ${app.entry.dob_month}/${app.entry.dob_day}/${app.entry.dob_year}`}</span>
                                    </div>
                                    <div className={styles.field}>{`Social Security (Read example): ${app.entry.social_security}`}</div>
                                    <div className={styles.field}>{`Pre-tax Annual Income: ${app.entry.gross_annual_income}`}</div>
                                </Col>
                            </Row>
                        </div>
                        <Button variant="primary" className={styles.btn} onClick={() => props.editCurrentApplication(app.id)}>edit application</Button>
                        <Button variant="primary" className={styles.btn} onClick={() => props.deleteApplication(app.id)}>delete application</Button>
                    </div>
                )}
            </Col>
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

const Applications = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default Applications;