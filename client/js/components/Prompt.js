import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions';
import uuid from 'uuid-js';
import { validateEmail } from '../validators';

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  question: state.prompt.question,
  sessionOptions: state.prompt.sessionOptions
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export class Prompt extends React.Component {
  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(retrievalEmail, sessionId) {
    if (validateEmail(retrievalEmail)) {
      this.props.actions.retrieveFormState(retrievalEmail, sessionId);
    } else {
      this.props.actions.createNewSession(uuid.create(4).toString());
      this.props.actions.initializeQuestions();
    }
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.props.actions.promptChange(e.target.value);
  }

  render() {
    const { sessionOptions, question } = this.props;
    return (
      <div className="new-session-prompt">
        <div className="form-group">
          <label
            className={question.inputValue ? 'form-label' : ''}
            style={{ height: '22px', padding: '10px' }}
            htmlFor="name"
          >
            {question.inputValue ? question.text : null}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={question.inputValue}
            onChange={e => this.handleEmailChange(e)}
            placeholder={question.text}
            tabIndex="1"
            required
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => this.handleButtonClick(question.inputValue)}
            className="btn btn-start-order"
          >
            {validateEmail(question.inputValue)
              ? 'retrieve'
              : 'or fill out a new form'}
          </button>
        </div>
        {sessionOptions &&
          sessionOptions.map(session => (
            <div
              key={session}
              onClick={() =>
                this.handleButtonClick(question.inputValue, session)
              }
            >
              {session}
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prompt);
