import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from './Hello';

ReactDOM.render(
  React.createElement(Hello, { compiler: 'TypeScript', framework: 'React' }),
  document.getElementById('root')
);
