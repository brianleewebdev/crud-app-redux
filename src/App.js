import './css/App.scss';
import React from 'react';
import ConnectedForm from './components/Form';
import Header from './components/Header';
import ConnectedList from './components/List';
import Container from 'react-bootstrap/Container';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formLoaded: true,
      listLoaded: false,
      currentAppId: 0
    }
    this.toggleLoaded = this.toggleLoaded.bind(this)
  }

  toggleLoaded = () => {
    this.setState(prevState => ({
      formLoaded: !prevState.formLoaded,
      listLoaded: !prevState.listLoaded,
      currentAppId: ''
    }))
  }

  editCurrentApplication = (id) => {
    this.setState({
      formLoaded: true,
      listLoaded: false,
      currentAppId: id
    })
  }

  render() {
    return (
      <div className="freedom-forever-crud-app">
        <Header />
        <Container>
          {
            this.state.formLoaded === true ?
              <ConnectedForm
                toggleLoaded={this.toggleLoaded}
                currentAppId={this.state.currentAppId}
              />
              : null
          }
          {
            this.state.listLoaded === true ? 
              <ConnectedList 
                toggleLoaded={this.toggleLoaded}
                editCurrentApplication={this.editCurrentApplication}
              /> 
              : null
          }
        </Container>
      </div>
    )
  }
}
