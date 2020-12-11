import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from '../assets/img/ff-loading-icon-copy.png';
import styles from '../css/module/list.module.scss';

import Applications from './ListApplications';

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount = () => {
        this.setState({ isLoaded: true })
    }

    render() {
        if (this.state.isLoaded === true) {
            return (
                <Row>
                    {
                        this.props.applications.length !== 0 ? 
                            <Applications editCurrentApplication={this.props.editCurrentApplication} /> 
                            : 
                            <div className={styles.appMissingWarning}>You haven't applied for any loans yet! Add a new loan application below!</div>
                    }
                    <Button className={styles.addApplication} onClick={this.props.toggleLoaded}>
                        <div className={styles.icon}>&#43;</div>
                    </Button>
                </Row>
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

const ConnectedList = connect(mapStateToProps)(List)

export default ConnectedList