import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
    return (
        <div className={styles.listApplicationsWrapper}>
            <Container>
                <Row>
                    <Col>
                        <h1>Your Current Loan Applications</h1>
                        {props.applications.map(app =>
                            <div className={styles.listApplications} key={app.id}>
                                <div className={styles.listWrapper}>
                                    <p>Applied on</p>
                                    <div className="name">{app.content.first_name + ' ' + app.content.last_name}</div>
                                    <div className="phone">{app.content.phone}</div>
                                    <div className="email">{app.content.email}</div>
                                    <div className="address">
                                        <span>{app.content.address + ' ' + app.content.city + ', ' + app.content.state + ' ' + app.content.zip}</span>
                                    </div>
                                </div>
                                <Button variant="primary" className={styles.btn}>edit application</Button>
                                <Button variant="primary" className={styles.btn} onClick={() => props.deleteApplication(app.id)}>delete application</Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;