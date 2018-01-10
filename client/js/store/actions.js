import randomQuestionsArray from '../helpers/randomQuestionsArray';

export const inputChange = (val, questionIdx) => ({
  type: 'UPDATE_INPUT',
  payload: {
    inputValue: val,
    questionIndex: questionIdx
  }
});

export const initializeQuestions = () => {
  const questions = randomQuestionsArray
    .sort(() => 0.5 - Math.random())
    .slice(0, 9);
  const questionNames = Array.apply(null, { length: questions.length }).map(
    Number.call,
    Number
  );

  return {
    type: 'INITITIALIZE_QUESTIONS',
    payload: {
      questions,
      questionNames
    }
  };
};

export const promptChange = val => ({
  type: 'ANSWER_PROMPT',
  payload: {
    inputValue: val
  }
});

export const createNewSession = sessionId => ({
  type: 'GENERATE_NEW_SESSION',
  payload: {
    sessionId
  }
});

export const retrieveFormState = (retrievalUser, sessionId) => dispatch => {
  const url = `getSession/${retrievalUser}${sessionId ? `/${sessionId}` : ''}`;
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.sessions) {
        return dispatch({
          type: 'SHOW_SESSION_CHOICES',
          payload: json.sessions
        });
      } else {
        return dispatch({ type: 'HYDRATE_APP', payload: json });
      }
    })
    .catch(err => console.log(err));
};

export const completedForm = val => ({
  type: 'COMPLETED_FORM',
  payload: val
});