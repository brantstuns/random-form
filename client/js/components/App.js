import React from 'react';
import Topbar from './Topbar';
import Form from './Form';
import Prompt from './Prompt';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions';

const mapStateToProps = state => ({
  completed: state.form.completed,
  sessionId: state.sessionId
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export class App extends React.Component {
  render() {
    const { completed, sessionId } = this.props;
    return (
      <div className="container">
        <Topbar completed={completed} />
        {sessionId ? <Form /> : <Prompt />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);