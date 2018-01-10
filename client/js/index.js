import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import '../styles/styles.scss';
import 'raf/polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import _throttle from 'lodash.throttle';
import { validateEmail } from './validators';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const persistForHydration = () => {
  const state = store.getState();
  const sessionId = state.sessionId;
  const email = state.form.questions[0].inputValue;
  if (sessionId && validateEmail(email)) {
    const body = {
      email,
      sessionId,
      state
    };
    return fetch('saveForm', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    })
      .then(res => res.OK && console.log('nice'))
      .catch(err => console.log(err));
  }
};

const throttledPersist = _throttle(persistForHydration, 3000, {'leading': false});
store.subscribe(throttledPersist);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('appRender')
);
