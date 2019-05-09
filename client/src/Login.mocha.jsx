import Login from './Login';
import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from 'react-testing-library';

describe('Login', function() {
  this.timeout(5000);

  function renderComponent(props = {}) {
    return render(<Login {...props} />);
  }

  afterEach(cleanup);

  it('renders successfully', function() {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
  });
});
