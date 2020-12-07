import './css/App.scss';
import React from 'react';
import ConnectedForm from './components/Form';
import Header from './components/Header';
import List from './components/ListApplications';

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        data: []
      }
  }

  render() {
    return(
      <div className="freedom-forever-crud-app">
        <Header />
        <ConnectedForm />
        <List />
      </div>
    )
  }
}
