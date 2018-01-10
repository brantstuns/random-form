const initialState = {
  sessionId: '',
  prompt: {
    question: {
      text: 'Enter your email to retrieve a saved session',
      inputValue: ''
    }
  },
  form: {
    completed: false,
    questionNames: [0],
    questions: {
      0: {
        text: 'What is your email?',
        inputValue: ''
      }
    }
  }
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'COMPLETED_FORM': {
      const formState = Object.assign({}, state.form, { completed: action.payload });
      return Object.assign({}, state, { form: formState });
    }
    case 'HYDRATE_APP': {
      const formState = Object.assign({}, state.form, action.payload.form);
      return Object.assign({}, state, { form: formState, sessionId: action.payload.sessionId });
    }
    case 'GENERATE_NEW_SESSION':
      return Object.assign({}, state, { sessionId: action.payload.sessionId });
    case 'UPDATE_INPUT': {
      const { questionIndex, inputValue } = action.payload;
      const updateQuestionState = Object.assign(
        {},
        state.form.questions[questionIndex],
        { inputValue }
      );
      const updatedQuestionsState = Object.assign({}, state.form.questions, {
        [questionIndex]: updateQuestionState
      });
      const updateFormState = Object.assign({}, state.form, {
        questions: updatedQuestionsState
      });
      return Object.assign({}, state, { form: updateFormState });
    }
    case 'ANSWER_PROMPT': {
      const { inputValue } = action.payload;
      const promptQuestionState = Object.assign({}, state.prompt.question, { inputValue });
      const promptState = Object.assign({}, state.prompt, { question: promptQuestionState });
      return Object.assign({}, state, { prompt: promptState });
    }
    case 'INITITIALIZE_QUESTIONS': {
      const { questions, questionNames } = action.payload;
      const initializeQuestions = questions.reduce((acc, question, idx) => {
        return idx === 0
          ? acc
          : Object.assign({}, acc, {
              [idx]: { text: question, inputValue: '' }
            });
      }, initialState.form.questions);
      const formState = Object.assign({}, state.form, {
        questionNames,
        questions: initializeQuestions,
        completed: false
      });
      return Object.assign({}, state, { form: formState });
    }
    case 'SHOW_SESSION_CHOICES': {
      const promptState = Object.assign({}, state.prompt, { sessionOptions: action.payload });
      return Object.assign({}, state, { prompt: promptState });
    }
    default:
      return state;
  }
}
