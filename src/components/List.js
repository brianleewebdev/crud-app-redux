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
            isLoaded: false,
            searchTerm: '',
            searchResults: [],
            searchTextMatch: true
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount = () => {
        this.setState({ isLoaded: true })
    }

    handleSearch = (e) => {
        let searchTerm = e.target.value.toLowerCase()
        const results = this.props.applications.filter(app => app.entry.first_name.toLowerCase().includes(searchTerm) || app.entry.last_name.toLowerCase().includes(searchTerm))
        console.log(results)
        // if searchTerm contains a string or integer and the filtered list does not contain any matching terms, return false
        if (e.target.value.length !== 0 && results.length === 0) {
            this.setState({ searchTextMatch: false })
            // if searchTerm contains a string or integer and the filtered list contains a matching term, return true
        } else if (e.target.value.length !== 0 && results.length !== 0) {
            this.setState({ searchTextMatch: true })
            // if searchTerm is empty, return true to see all applications
        } else if (e.target.value.length === 0) {
            this.setState({ searchTextMatch: true })
        }
        this.setState({ searchResults: results })
    }

    render() {
        if (this.state.isLoaded === true) {
            return (
                <Row>
                    {
                        this.props.applications.length !== 0 ?
                            <Applications editCurrentApplication={this.props.editCurrentApplication} handleSearch={this.handleSearch} results={this.state.searchResults} searchTextMatch={this.state.searchTextMatch} />
                            :
                            <div className="missing-applications">
                                <div className="loading">
                                    <div className="loading-icon-wrapper">
                                        <img className="loading-icon animate-flicker" src={logo} alt="Please wait while we fetch your data!" />
                                    </div>
                                    <span>you have not applied for any loans!</span>
                                    <span>please click the add button below to begin!</span>
                                </div>
                            </div>
                    }
                    <Button className={styles.btn} onClick={this.props.toggleLoaded} title="Add new loan application">
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