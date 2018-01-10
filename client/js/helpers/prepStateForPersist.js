import moment from 'moment';

export default function(state) {
  const form = state.form;
  const sessionId = { sessionId: state.sessionId };
  const email = { email: form.questions[0].inputValue };
  const timeStamp = { timeStamp: moment().format('MM/DD/YYYY | hh:mm:ss a') };
  const completed = { completed: form.completed };
  return Object.assign({}, { form }, sessionId, email, timeStamp, completed);
}