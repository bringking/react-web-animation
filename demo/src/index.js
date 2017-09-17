import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import examples
import App from './App';

render(
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
