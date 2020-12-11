import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from '../assets/img/ff-loading-icon-copy.png';
import styles from '../css/module/list_applications.module.scss';
import { deleteApplication } from '../redux/actions';

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
        return (
            <Col>
                <h1>Your Current Loan Applications</h1>
                {props.applications.map((app, index) =>
                    <div className={styles.listApplications} key={index}>
                        <div className={styles.listWrapper}>
                            <div className="name">{app.entry.first_name + ' ' + app.entry.last_name}</div>
                            <div className="phone">{app.entry.phone}</div>
                            <div className="email">{app.entry.email}</div>
                            <div className="address">
                                <span>{app.entry.address + ' ' + app.entry.city + ', ' + app.entry.state + ' ' + app.entry.zip}</span>
                            </div>
                            <div className="date">Applied on {app.timestamp}</div>
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