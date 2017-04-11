import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Hello } from './Hello';


const load = () => ReactDOM.render(
  React.createElement(
    AppContainer,
    null,
    React.createElement(Hello, { compiler: 'TypeScript', framework: 'React' })
  ),
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./Hello', load);
}

load();
