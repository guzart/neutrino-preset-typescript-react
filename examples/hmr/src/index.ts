import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import * as Hello from './Hello'; // imports the component types

const load = (Root: any) => {
  const app = React.createElement(Root, { compiler: 'TypeScript', framework: 'React' });
  // Render the Component we pass in
  ReactDOM.render(React.createElement(AppContainer, null, app), document.getElementById('root'));
};

if (module.hot) {
  // Wait for changes in './Hello'
  module.hot.accept('./Hello', () => {
    // Get new version
    const NextHello = require('./Hello') as typeof Hello;
    // Render again
    load(NextHello.Hello);
  });
}

// Initial render, include the component
load(Hello.Hello);
