import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions';
import uuid from 'uuid-js';

const mapStateToProps = state => ({
  sessionId: state.sessionId,
  form: state.form
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export class Form extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleChange(event, questionIndex) {
    event.preventDefault();
    this.props.actions.inputChange(event.target.value, questionIndex);
  }

  handleRestart() {
    this.props.actions.createNewSession(uuid.create(4).toString());
    this.props.actions.initializeQuestions();
  }

  render() {
    const { actions, form } = this.props;
    return (
      <div className="form-container">
        <form
          id="contact-form"
          className="form"
          action="#"
          method="POST"
          role="form"
        >
          {form.questionNames.map(idx => {
            const question = form.questions[idx];
            return (
              <div className="form-group" key={idx}>
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
                  onChange={e => this.handleChange(e, idx)}
                  placeholder={question.text}
                  tabIndex="1"
                  required
                />
              </div>
            );
          })}
          <div className="btn-container">
            <div className="text-center">
              <button type="submit" className="btn btn-start-order">
                Save
              </button>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-start-order" onClick={this.handleRestart}>
                Restart
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
