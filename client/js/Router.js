import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
    </BrowserRouter>
  );
}
