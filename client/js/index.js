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
import { validateEmail } from './helpers/validators';
import { persistSessionCall } from './api/requests';
import prepStateForPersist from './helpers/prepStateForPersist';

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
    return persistSessionCall(prepStateForPersist(state));
  }
};

const throttledPersist = _throttle(persistForHydration, 500, {'leading': false});
store.subscribe(throttledPersist);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('appRender')
);
